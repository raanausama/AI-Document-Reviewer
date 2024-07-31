# AI Research Papers Reviewer App

Welcome to DocumentReviewer! This application is designed to streamline document review processes using a user-friendly interface.

## Backend Setup (MongoDB)

To set up the backend of the application:

1. Ensure you have MongoDB installed on your machine.
2. Clone this repository to your local machine.
3. Navigate to the `backend` directory.
4. Install the dependencies using `npm install`.
5. Configure your MongoDB connection string in the `.env` file.
6. Start the server using `npm run dev`.

## Frontend Setup (Vite React)

To set up the frontend of the application:

1. Clone this repository to your local machine if you haven't already.
2. Navigate to the `frontend` directory.
3. Install the dependencies using `npm install`.
4. Start the development server using `npm start`.

## Authentication (Firebase)

User authentication in DocumentReviewer is handled by Firebase:

1. Navigate to the Firebase console and create a new project.
2. Set up Firebase Authentication with your preferred authentication method (e.g., email/password, Google sign-in).
3. Copy your Firebase project configuration details.
4. In the frontend code (`frontend/src/firebase.js`), replace the Firebase configuration with your own.
5. With Firebase authentication configured, users can sign up and log in securely to access the app features.

## Usage

Once the backend and frontend are set and running, users can:

- Sign up for a new account using the provided authentication methods.
- Log in to their account to access the application features.
- Use the DocumentReviewer interface to upload, review, and manage documents efficiently.
