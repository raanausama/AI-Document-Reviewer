from flask import (
    Flask,
    render_template,
    request,
    jsonify,
    redirect,
    url_for,
    session,
    flash,
    make_response,
)
import os
from flask_cors import CORS
from tempfile import NamedTemporaryFile
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains import StuffDocumentsChain
from langchain.chains.llm import LLMChain
from langchain.prompts import PromptTemplate
from langchain_community.document_loaders import PyMuPDFLoader
from langchain_core.documents import Document
import jwt
from functools import wraps
from datetime import datetime, timedelta
import time
import asyncio
import aiohttp
import re
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import IntegrityError
import markdown
from dotenv import load_dotenv


app = Flask(__name__)
CORS(app)
app.secret_key = "supersecretkey"

# Load environment variables from .env file
load_dotenv()

# Configure the database
app.config["SQLALCHEMY_DATABASE_URI"] = (
    "sqlite:///users.db"  # Using SQLite for simplicity
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['MAX_CONTENT_LENGTH'] = 100 * 1024 * 1024  
db = SQLAlchemy(app)


# Define the User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)


# Create the database tables
with app.app_context():
    db.create_all()

GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')
os.environ["GOOGLE_API_KEY"] = GOOGLE_API_KEY

llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", temperature=0.5)

app.debug = True

# Use single instance of PromptTemplate for each template type
templates = {
    "Summary": PromptTemplate.from_template(
        """
        Summary  of the following:
        "{text}"
        Summary: Summarize the following paper. summary should be thorough, it should be useful.
    """
    ),
    "Skills": PromptTemplate.from_template(
        """
        List skills of the following:
        "{text}"
        SKILLS:
    """
    ),
    "Grammatical Error": PromptTemplate.from_template(
        """
        Please review the following text and list all grammatical errors, including issues with punctuation, 
        verb tense, subject-verb agreement, sentence structure, and any other grammatical mistakes. 
        For each error, provide a brief explanation and a suggestion for correction.
        Text: "{text}"
        GRAMMATICAL ERRORS:
    """
    ),
}

@app.errorhandler(413)
def request_entity_too_large(error):
    return jsonify({"error": "File is too large. Maximum file size is 20MB."}), 413

def generate_analysis_template(points):
    prompt_lines = [
        " Analyzing the following research paper, evaluate each section based on the provided criteria.",
        'Research Paper Text: "{text}"',
    ]
    for point in points:
        prompt_lines.append(f"- {point}")
    return PromptTemplate.from_template("\n".join(prompt_lines))


def process_document(template_key, document, points=None):
    if template_key == "Analysis" and points:
        template = generate_analysis_template(points)
    else:
        template = templates.get(template_key)
    if not template:
        return {"error": "Invalid template key"}

    prompt = template
    llm_chain = LLMChain(llm=llm, prompt=prompt)
    stuff_chain = StuffDocumentsChain(
        llm_chain=llm_chain, document_variable_name="text"
    )
    return stuff_chain.invoke(document)


async def fetch_chunk(session, template_key, chunk, points=None):
    loop = asyncio.get_running_loop()
    return await loop.run_in_executor(
        None, process_document, template_key, chunk, points
    )


async def process_chunks_concurrently(template_key, document_chunks, points=None):
    async with aiohttp.ClientSession() as session:
        tasks = [
            fetch_chunk(session, template_key, chunk, points)
            for chunk in document_chunks
        ]
        results = await asyncio.gather(*tasks)
    return results


def preprocess_document(text):
    intro_match = re.search(r"\bIntroduction\b", text, re.IGNORECASE)
    ref_match = re.search(r"\bReferences\b", text, re.IGNORECASE)

    if intro_match and ref_match:
        start = intro_match.start()
        end = ref_match.end()
        return text[start:end]
    elif intro_match:
        start = intro_match.start()
        return text[start:]
    elif ref_match:
        end = ref_match.end()
        return text[:end]
    else:
        return text  # Return the original text if neither section is found


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.cookies.get("token")
        if not token:
            flash("Token is missing!", "error")
            return redirect(url_for("login"))
        try:
            jwt.decode(token, app.secret_key, algorithms=["HS256"])
            print(jwt.decode(token, app.secret_key, algorithms=["HS256"]))
        except jwt.ExpiredSignatureError:
            flash("Token has expired!", "error")
            return redirect(url_for("login"))
        except jwt.InvalidTokenError:
            flash("Invalid Token!", "error")
            return redirect(url_for("login"))
        return f(*args, **kwargs)

    return decorated


@app.route("/signup", methods=["GET", "POST"])
def signup():
    if request.method == "POST":

        username = request.form["username"]
        password = request.form["password"]
        new_user = User(username=username, password=password)
        try:
            db.session.add(new_user)
            db.session.commit()
            flash("Sign-up successful! Please log in.", "success")
            return redirect(url_for("login"))
        except IntegrityError:
            db.session.rollback()
            flash("Username already exists", "error")
    return render_template("signup.html")


@app.route("/", methods=["GET"])
def home():
    return redirect(url_for("login"))


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
        user = User.query.filter_by(username=username).first()
        if user and user.password == password:
            token = jwt.encode(
                {"username": username, "exp": datetime.utcnow() + timedelta(hours=1)},
                app.secret_key,
            )
            print(token)
            response = make_response(redirect(url_for("index")))
            response.set_cookie("token", token)
            flash("Login successful!", "success")
            return response
        else:
            flash("Invalid username or password", "error")
    return render_template("login.html")


@app.route("/logout")
def logout():
    response = make_response(redirect(url_for("login")))
    response.delete_cookie("token")
    flash("You have been logged out", "success")
    return response


@app.route("/rpr", methods=["GET", "POST"])
# @token_required
def index():
    if request.method == "POST":
        user_file = request.files.get("file")
        user_template = request.form.get("template")
        selected_points = request.form.getlist("points")

        if user_file and user_template != "Select type":
            with NamedTemporaryFile(delete=False) as temp_file:
                user_file.save(temp_file.name)
                loader = PyMuPDFLoader(temp_file.name)
                data = loader.load()

            s1 = time.time()
            documents = [
                Document(page_content=preprocess_document(doc.page_content))
                for doc in data
            ]
            print(f"Preprocessing time: {time.time() - s1} seconds")

            if documents:
                start_time = time.time()

            # Set max_chars_per_chunk based on the total page count
                page_count = len(data)  # Get the number of pages

            # Dynamically sets max_chars_per_chunk based on the number of pages
                if 50 <= page_count < 100:
                    max_chars_per_chunk = 150000
                elif 100 <= page_count < 200:
                    max_chars_per_chunk = 400000
                elif 200 <= page_count < 400:
                    max_chars_per_chunk = 1000000
                elif 400 <= page_count < 700:
                    max_chars_per_chunk = 2000000
                else:
                    max_chars_per_chunk = 150000
                document_chunks = []
                current_chunk = []
                current_chunk_size = 0

                for doc in documents:
                    doc_length = len(doc.page_content)
                    if current_chunk_size + doc_length > max_chars_per_chunk:
                        document_chunks.append(current_chunk)
                        current_chunk = [doc]
                        current_chunk_size = doc_length
                    else:
                        current_chunk.append(doc)
                        current_chunk_size += doc_length

                if current_chunk:  # Add any remaining documents as the last chunk
                    document_chunks.append(current_chunk)

                combined_results = []

                # Process each chunk using asynchronous processing
                results = asyncio.run(
                    process_chunks_concurrently(
                        user_template, document_chunks, selected_points
                    )
                )

                for result in results:
                    combined_results.extend(
                        result.get("output_text", "").strip().splitlines()
                    )

                elapsed_time = time.time() - start_time
                print(f"Processing time: {elapsed_time} seconds")
                html_content = [markdown.markdown(result) for result in combined_results]
                
                return render_template('results.html', results=html_content)
            else:
                return render_template('results.html', error="No document loaded.")
        else:
            return render_template('results.html', error="Please select a file and analysis type.")

    return render_template("index.html")

if __name__ == "__main__":
    app.run(host='0.0.0.0')
