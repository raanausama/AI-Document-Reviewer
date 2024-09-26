// import background from "../assets/background.jpg";
import { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Container,
  Button,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";
import ResponsiveAppBar from "../navbar/NavBar";
import UploaderDropzone from "../pages/Dropzone";
import axios from "axios";
import html2pdf from "html2pdf.js";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import "./../Loader/Loader.css";
import { apiGet, apiPost } from "../utils/axios";
import { LoadingButton } from "@mui/lab";
import logo1 from "../assets/logo1.png";

// import Badge from "@mui/material/Badge";
const formatResult = (result) => {
  const cleanedResult = result
    .replace(/## (.*?)(?=\n|$)/g, '<h3 style="font-weight:bold;">$1</h3>')
    .replace(/^\* (.*?)(?=\n|$)/gm, "<li>$1</li>")
    .replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight:bold;">$1</strong>');
  return `<ul>${cleanedResult}</ul>`;
};
const formatweaknessResult = (result) => {
  // Replace **text** with bold tags
  let formattedText = result
    .replace(/\*\*(.*?)\:\*\*/g, "<h3>$1:</h3>")
    .replace(/- /g, "")
    .replace(/\n/g, "<br>");

  return `<ul>${formattedText}</ul>`;
};

function UploadDocument({ token, user }) {
  console.log("user is", user);
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState("");
  const [downloaded, setDownloaded] = useState("");
  const [count, setCount] = useState(0);

  const [score, setScore] = useState("");
  const [review, setReview] = useState("");
  const [weakness, setWeakness] = useState("");
  const [strength, setStrength] = useState("");
  const [grammatical, setGrammatical] = useState("");

  const base64Image =
    "data:image/png;base64,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AQIdAAAHCHQAABwg0AEAcIBABwDAAQIdAAAHCHQAABwg0AEAcIBABwDAAQIdAAAHCHQAABwg0AEAcIBABwDAAQIdAAAHCHQAABwg0AEAcIBABwDAAQIdAAAHCHQAABwg0AEAcIBABwDAAQIdAAAHCHQAABwg0AEAcIBABwDAAQIdAAAHCHQAABwg0AEAcIBABwDAAQIdAAAHCHQAABwg0AEAcIBABwDAAQIdAAAHCHQAABwg0AEAcIBABwDAAQIdAAAHCHQAABwg0AEAcIBABwDAAQIdAAAHCHQAABwg0AEAcIBABwDAAQIdAAAHCHQAABwg0AEAcIBABwDAAQIdAAAHCHQAABwg0AEAcIBABwDAAQIdAAAHCHQAABwg0AEAcIBABwDAAQIdAAAHCHQAABwg0AEAcIBABwDAAQIdAAAHCHQAABwg0AEAcIBABwDAAQIdAAAHCHQAABwg0AEAcIBABwDAAQIdAAAHCHQAABwg0AEAcIBABwDAAQIdAAAHCHQAABwg0AEAcIBABwDAAQIdAAAHCHQAABwg0AEAcIBABwDAAQIdAAAHCHQAABwg0AEAcIBABwDAAQIdAAAHCHQAABwg0AEAcIBABwDAAQIdAAAHCHQAABwg0AEAcIBABwDAAQIdAAAHCHQAABwg0AEAcIBABwDAAQIdAAAHCHQAABwg0AEAcIBABwDAAQIdAAAHCHQAABwg0AEAcIBABwDAAQIdAAAHCHQAABwg0AEAcIBABwDAAQIdAAAHCHQAABwg0AEAcIBABwDAgf8D0yfdPtHeHIMAAAAASUVORK5CYII=";

  //  console.log('UploadDocumenttoken',token)
  const [documentText, setDocumentText] = useState(""); // State to store the text content of the uploaded document
  const [words, setWords] = useState([]); // State to store the array of words
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [files, setFiles] = useState({
    doc: {},
  });
  const [done, setDone] = useState();
  // console.log("files", files);
  // console.log("done", done);
  const [responses, setResponses] = useState([]); // State to store the responses
  const [progress, setProgress] = useState(0); // State for progress

  const handleResponses = () => {
    setResponses([]);
  };

  const checkPaymentStatus = async () => {
    try {
      const res = await apiGet(
        `payment/getTransactionByEmail?email=${user?.email}`
      );
      console.log("statusoftransation", res?.transactions[0]?.download);

      setStatus(res?.transactions);
      setDownloaded(res?.transactions[0]?.download);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  };

  const handleFileUpload = async () => {
    // console.log("handleFileUpload",  files.doc[0].file);
    const formData = new FormData();

    // Assuming you have a single file in the doc array
    if (files.doc[0]) {
      // console.log('files')
      formData.append("file", files.doc[0].file);
      formData.append("template", "Analysis");
      formData.append("points", "Report");
      // console.log(
      //   "formData",
      //   formData,
      //   `${import.meta.env.VITE_APP_SERVER_API_URL}`
      // );
      try {
        setLoading(true);
        console.log("12313123");
        if (token) {
          if (!status[0]) {
            // If the payment has not been done, show SweetAlert and navigate to payment page
            Swal.fire({
              icon: "info",
              title: "Transaction Required",
              text: "Please complete the payment to continue.",
              background: "linear-gradient(to right, #012a61, #2997f7)",
              color: "white",
              confirmButtonColor: "#012a61",
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/payout"); // Navigate to payment page
              }
            });
            setLoading(false);
            return; // Prevent file upload from proceeding
          }

          if (downloaded) {
            Swal.fire({
              icon: "warning",
              title: "Payment Required",
              text: "To submit again, you need to make another payment. Each payment allows only one submit.",
              background: "linear-gradient(to right, #012a61, #2997f7)",
              color: "white",
              showCancelButton: true,
              confirmButtonColor: "#012a61",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, make payment",
              cancelButtonText: "No, cancel",
            }).then(async (result) => {
              if (result.isConfirmed) {
                // Proceed to make another payment
                const res = await apiGet(
                  `payment/deleteByEmail?email=${user?.email}`
                );
                navigate("/payout");
              } else {
                // Delete the data using the email

                console.log("Data deleted successfully");
              }
            });
            setLoading(false);
            return; // Prevent further execution until the user has responded
          }

          // console.log('token',token)
          const response = await axios.post(
            `${import.meta.env.VITE_APP_SERVER_API_URL}/rpr`,
            formData,
            {
              onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                setProgress(percentCompleted);
              },
            }
          );
          console.log("File uploaded successfully", response?.data?.results);

          setResponses(response?.data?.results);
          // const results = response?.data?.results;

          const jsonString = response.data?.results
            .join("") // Join the array elements into a single string
            .replace(/```json|```|\n/g, "") // Remove the JSON code block indicators and new lines
            .trim(); // Trim any leading or trailing whitespace

          // Parse the cleaned string into JSON
          let jsonObject;
          try {
            jsonObject = JSON.parse(jsonString);
          } catch (error) {
            console.error("Failed to parse JSON:", error);
            jsonObject = null; // Handle error appropriately
          }
          console.log("jsonObject", jsonObject);

          setScore(jsonObject?.score || "");
          setReview(jsonObject?.Review || "");
          setWeakness(jsonObject?.weakness || "");
          setStrength(jsonObject?.strength || "");
          setGrammatical(jsonObject?.grammatical || "");

          console.log("strength", strength);

          // console.log("scoresArray", scoresArray);

          setDone(true);
          // const doc = new jsPDF();

          // let yOffset = 20; // Start vertical position for text
          // doc.setFontSize(12);

          // // Loop through each result
          // response.data.results.forEach((result) => {
          //   // Replace ## for headings
          //   if (result.startsWith("##")) {
          //     doc.setFontSize(16);
          //     doc.setFont("helvetica", "bold");
          //     // doc.text(result.replace("##", "").trim(), 10, yOffset);
          //     yOffset += 10; // Move down for the next line
          //   }
          //   // Replace ** for bold text
          //   else if (/\*\*(.*?)\*\*/.test(result)) {
          //     doc.setFontSize(12);
          //     doc.setFont("helvetica", "bold");
          //     const boldText = result.replace(/\*\*(.*?)\*\*/g, "$1"); // Remove ** around text
          //     doc.text(boldText, 10, yOffset);
          //     yOffset += 10; // Move down
          //   }
          //   // Handle bullet points (lines starting with *)
          //   else if (result.startsWith("*")) {
          //     doc.setFontSize(12);
          //     doc.setFont("helvetica", "normal");
          //     const bulletText = result.replace("*", "•"); // Replace * with bullet point
          //     doc.text(bulletText.trim(), 10, yOffset);
          //     yOffset += 10; // Move down for next line
          //   } else {
          //     doc.setFontSize(12);
          //     doc.setFont("helvetica", "normal");
          //     doc.text(result.trim(), 10, yOffset);
          //     yOffset += 10; // Move down
          //   }

          //   // Check for page overflow and add new page
          //   if (yOffset > 280) {
          //     doc.addPage();
          //     yOffset = 20;
          //   }
          // });

          // // Save the PDF
          // doc.save("document-review-results.pdf");
          setLoading(false);
        } else {
          setDone(true);
          setLoading(false);
          Swal.fire({
            icon: "warning",
            title: "Please login to Continue",
            text: "Click OK to redirect to login page",
            background: "linear-gradient(to right, #012a61, #2997f7)",
            color: "white",
            cancelButtonText: "Cancel",
            showCancelButton: true,
            confirmButtonColor: "#012a61",
            cancelButtonColor: "brown",

            buttons: true,
            dangerMode: true,
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/login");
            } else {
              // Handle the case where the user cancels the upload
              console.log("User does not want to login");
            }
          });
          // Swal.fire({
          //   title: "Please login to continue",
          //   text: "Click ok to redirect to login page",
          //   icon: "warning",
          //   buttons: true,
          //   dangerMode: true,
          // }).then((willLogin) => {
          //   if (willLogin) {
          //     navigate("/login");
          //   } else {
          //     // Handle the case where the user cancels the upload
          //     console.log("User does not want to login");
          //   }
          // });
        }
      } catch (error) {
        console.error("Error uploading file", error);
        setDone(false);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    handleFileUpload();
    checkPaymentStatus();
  }, [files]);

  useEffect(() => {
    if (done && responses?.length > 0 ) {
      generatePdf();
      // setCount(count + 1);
    }
  }, [done, responses]);

  console.log("Paymentstatus", status);

  const parseScoreData = (scoreString) => {
    return scoreString
      .trim()
      .split("\n")
      .map((line) => {
        const [section, score] = line.split(":").map((item) => item.trim());
        return { section, score };
      });
  };

  const scoreArray = parseScoreData(score);
  console.log("scoreArray", scoreArray);

  // const downloadPdf = () => {
  //   const element = document.getElementById("responseContent");
  //   console.log("element", element);
  //   html2pdf().from(element).save("document-review-results.pdf");
  // };
  const generatePdf = async () => {
    setLoadingButton(true);
    const htmlContent = document.getElementById("responseContent").innerHTML;
    console.log("htmlContent", htmlContent);

    const response = await apiPost(
      "login/downloadPdf",
      { html: htmlContent },
      {
        responseType: "blob", // Expect binary data
      }
    );
    const pdfBytesArray = Object.values(response.pdfBuffer);
    const pdfBytes = new Uint8Array(pdfBytesArray).buffer;
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");

    link.href = window.URL.createObjectURL(blob);
    // console.log('blob',blob)

    link.download = "review.pdf";
    link.click();
    const res = await apiGet(`payment/updateTransactions?email=${user?.email}`);
    setDownloaded(true);
    setLoadingButton(false);
  };

  return (
    <>
      <Container>
        <ResponsiveAppBar token={token} />
        <Grid container mt={30} color={"white"} mb={5}>
          <Grid item xs={12}>
            <Typography
              className='animate-character4'
              variant='h2'
              sx={{ fontSize: "3.5rem" }}
            >
              {" "}
              Upload Your Document
            </Typography>
            <Typography variant='body' sx={{ color: "gray" }}>
              {" "}
              Research Paper | Proposal | Project Report | Etc
            </Typography>
          </Grid>
          <Grid item xs={12} display='flex' justifyContent='center' mt={3}>
            <UploaderDropzone
              handleResponses={handleResponses}
              setWords={setWords}
              words={words}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              setDocumentText={setDocumentText}
              documentText={documentText}
              name='passport'
              setFiles={setFiles}
              files={files}
              setDone={setDone}
              token={token}
              handleFileUpload={handleFileUpload}
            />
          </Grid>
        </Grid>

        <Grid
          container
          mt={5}
          color={"white"}
          mb={20}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {loading && (
            <Grid
              className='loader'
              item
              xs={4}
              mt={3}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <div class='spinner'>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </Grid>
          )}

          {weakness && weakness?.length > 0 ? (
            <Grid item mt={5} xs={12}>
              <LoadingButton
                variant='contained'
                sx={{
                  background: "linear-gradient(to right, #012a61, #2997f7)",
                  color: "white",
                  // fontWeight: "bold",
                  transformOrigin: "50% 10px",
                  transition:
                    "transform 200ms ease-out, background 500ms ease-in-out",
                  "&:hover": {
                    transform:
                      "perspective(999px)  translate3d(0px, -4px, 5px)",
                    // background: "#a87b4c",
                  },
                  color: "white",
                  // width: { xs: "60%", sm: "40%", md: "45%", lg: "100%" },
                  // height: {
                  //   xs: "1.5rem",
                  //   sm: "2rem",
                  //   md: "3rem",
                  //   lg: "3rem",
                  // },
                  // fontSize: {
                  //   xs: "0.5rem",
                  //   sm: "9px",
                  //   md: "0.8rem",
                  //   lg: "1.1rem",
                  // },
                }}
                // onClick={downloadPdf}
                onClick={generatePdf}
              >
                {loadingButton ? "Downloading..." : "Download as PDF"}
              </LoadingButton>
            </Grid>
          ) : null}

          {weakness && weakness?.length > 0 ? (
            <div
              id='responseContent'
              style={{
                marginTop: "50px",
                background: "white",
                padding: "30px",
                borderRadius: "8px",
                boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* <div style={{ padding: "20px", border: "1px solid #ccc", maxWidth: "600px", margin: "auto" }}> */}
              <div
                style={{
                  display: "flex",
                  // flexDirection: "column",
                  alignItems: "left",
                  justifyContent: "space-between",
                  // marginBottom: "5px",
                }}
              >
                <div>
                  <img
                    src={base64Image}
                    alt='logo'
                    style={{
                      height: "150px",
                      width: "150px",
                      marginRight: "10px",
                      // background: 'beige',
                      // borderRadius: "30px",
                      // boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
                      marginLeft: "30px",
                    }}
                  />
                </div>
                <div style={{ marginRight: "55px" }}>
                  <h2
                    style={{ textAlign: "right", margin: 0, color: "#012a61" }}
                  >
                    ReviewIT
                  </h2>
                  <p
                    style={{ textAlign: "right", margin: 0, color: "#012a61" }}
                  >
                    1234 Company Address
                  </p>
                  <p
                    style={{ textAlign: "right", margin: 0, color: "#012a61" }}
                  >
                    City, State, ZIP
                  </p>
                  <p
                    style={{ textAlign: "right", margin: 0, color: "#012a61" }}
                  >
                    Phone: (123) 456-7890
                  </p>
                  <p
                    style={{ textAlign: "right", margin: 0, color: "#012a61" }}
                  >
                    Email: contact@yourcompany.com
                  </p>
                  <p
                    style={{
                      textAlign: "right",
                      margin: "0 0 20px 0",
                      color: "#012a61",
                    }}
                  >
                    Date: {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
              <hr style={{ marginBottom: "20px", width: "90%" }} />

              <div
                className='results-box'
                style={{
                  background: "#fdfdfd",
                  padding: "20px",
                  borderRadius: "8px",
                }}
              >
                <h2
                  style={{
                    borderRadius: "50px",
                    marginTop: "30px",
                    // background: "linear-gradient(to right, #012a61, #2997f7)",
                    // padding: "10px",
                    textAlign: "center",
                    color: "#012a61",
                  }}
                >
                  REVIEW RESULTS{" "}
                </h2>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <table
                    style={{
                      width: "70%",
                      borderCollapse: "collapse",
                      marginTop: "20px",
                      alignItems: "center",
                    }}
                  >
                    <thead>
                      <tr
                        style={{
                          background:
                            "linear-gradient(to right, #012a61, #2997f7)",
                          color: "white",
                        }}
                      >
                        <th
                          style={{
                            border: "1px solid #ddd",
                            padding: "8px",
                            textAlign: "left",
                          }}
                        >
                          Sections
                        </th>
                        <th
                          style={{
                            border: "1px solid #ddd",
                            padding: "8px",
                            textAlign: "left",
                          }}
                        >
                          Score
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {scoreArray.map((item, index) => (
                        <tr key={index}>
                          <td
                            style={{
                              border: "1px solid #ddd",
                              padding: "8px",
                              color: "black",
                              textAlign: "left",
                            }}
                          >
                            {item.section}
                          </td>
                          <td
                            style={{
                              border: "1px solid #ddd",
                              padding: "8px",
                              color: "black",
                              textAlign: "left",
                            }}
                          >
                            {item.score}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Box>
                  {review && review.length > 0 ? (
                    // review.map((result, index) => (
                    <>
                      <h2
                        style={{
                          borderRadius: "50px",
                          marginTop: "30px",
                          background:
                            "linear-gradient(to right, #012a61, #2997f7)",
                          padding: "10px",
                          textAlign: "center",
                          color: "white",
                        }}
                      >
                        REVIEW
                      </h2>
                      <div
                        // key={index}
                        style={{
                          marginTop: "10px",
                          lineHeight: "1.6",
                          color: "black",
                          textAlign: "left",
                        }}
                        dangerouslySetInnerHTML={{
                          __html: formatResult(review),
                        }}
                      />
                    </>
                  ) : (
                    <p style={{color: "#012a61"}}>No results found.</p>
                  )}
                </Box>
                <Box>
                  {weakness && weakness?.length > 0 ? (
                    // review.map((result, index) => (
                    <>
                      <h2
                        style={{
                          borderRadius: "50px",
                          marginTop: "30px",
                          background:
                            "linear-gradient(to right, #8B0000, #FF4500)",
                          padding: "10px",
                          textAlign: "center",
                          color: "white",
                        }}
                      >
                        WEAKNESSES
                      </h2>
                      <div
                        style={{
                          marginTop: "10px",
                          lineHeight: "1.6",
                          color: "black",
                          textAlign: "left",
                        }}
                        dangerouslySetInnerHTML={{
                          __html: formatweaknessResult(weakness),
                        }}
                      />
                    </>
                  ) : (
                    <p style={{color: "#012a61"}}>No results found.</p>
                  )}
                </Box>
                <Box>
                  {strength && strength?.length > 0 ? (
                    // review.map((result, index) => (
                    <>
                      <h2
                        style={{
                          borderRadius: "50px",
                          marginTop: "30px",
                          background:
                            "linear-gradient(to right, #004d00, #66ff66)",
                          padding: "10px",
                          textAlign: "center",
                          color: "white",
                        }}
                      >
                        STRENGTH
                      </h2>
                      <div
                        style={{
                          marginTop: "10px",
                          lineHeight: "1.6",
                          color: "black",
                          textAlign: "left",
                        }}
                        dangerouslySetInnerHTML={{
                          __html: formatweaknessResult(strength),
                        }}
                      />
                    </>
                  ) : (
                    <p style={{color: "#012a61"}}>No results found.</p>
                  )}
                </Box>
                <Box>
                  {grammatical && grammatical?.length > 0 ? (
                    // review.map((result, index) => (
                    <>
                      <h2
                        style={{
                          borderRadius: "50px",
                          marginTop: "30px",
                          background:
                            "linear-gradient(to right, #800000, #ffb3b3)",
                          padding: "10px",
                          textAlign: "center",
                          color: "white",
                        }}
                      >
                        GRAMMATICAL ERRORS
                      </h2>
                      <div
                        style={{
                          marginTop: "10px",
                          lineHeight: "1.6",
                          color: "black",
                          textAlign: "left",
                        }}
                        dangerouslySetInnerHTML={{
                          __html: formatweaknessResult(grammatical),
                        }}
                      />
                    </>
                  ) : (
                    <p style={{color: "#012a61"}}>No results found.</p>
                  )}
                </Box>
              </div>
            </div>
          ) : null}
        </Grid>
      </Container>
    </>
  );
}

export default UploadDocument;
