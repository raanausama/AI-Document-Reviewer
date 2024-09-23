// import background from "../assets/background.jpg";
import { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Container,
  Button,
  useMediaQuery,
  useTheme,
  CircularProgress,
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

// import Badge from "@mui/material/Badge";
const formatResult = (result) => {
  const cleanedResult = result
    .replace(/## (.*?)(?=\n|$)/g, '<h2 style="font-weight:bold;">$1</h2>')
    .replace(/^\* (.*?)(?=\n|$)/gm, "<li>$1</li>")
    .replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight:bold;">$1</strong>');
  return `<ul>${cleanedResult}</ul>`;
};

function UploadDocument({ token, user }) {
  console.log("user is", user);
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState("");
  const [downloaded, setDownloaded] = useState("");

  //  console.log('UploadDocumenttoken',token)
  const [documentText, setDocumentText] = useState(""); // State to store the text content of the uploaded document
  const [words, setWords] = useState([]); // State to store the array of words
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
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
              text: "The file has been downloaded. Would you like to make another payment?",
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
                const res = await apiGet(`payment/deleteByEmail?email=${user?.email}`);
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
          // console.log("File uploaded successfully", response?.data?.results);
          
          setResponses(response?.data?.results);
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
    if (done && responses?.length > 0) {
        generatePdf();
    }
}, [done, responses]);

  console.log("Paymentstatus", status);

  // const downloadPdf = () => {
  //   const element = document.getElementById("responseContent");
  //   console.log("element", element);
  //   html2pdf().from(element).save("document-review-results.pdf");
  // };
  const generatePdf = async () => {
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
    setDownloaded(true)
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
            <Typography variant='body' sx={{ color: "#2997f7" }}>
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
              {/* <CircularProgress  sx={{ color: "#a87b4c" }} /> */}
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

          {done && responses?.length > 0 ? (
            <Grid item mt={5} xs={12}>
              <Button
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
                    background: "#a87b4c",
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
                Download as PDF
              </Button>
            </Grid>
          ) : null}

          {done && responses?.length > 0 ? (
            // <Grid item xs={12} mt={2}>
            //   {/* <Typography variant="h4">Responses:</Typography> */}
            //   {/* {responses.map((response, index) => (
            //   <div key={index}> */}
            //   <div
            //     id='responseContent'
            //     dangerouslySetInnerHTML={{ __html: responses }}
            //   />
            //   {/* <Typography variant="subtitle1"><strong>{responses}</strong></Typography> */}
            //   {/* <Typography variant="body1">{response}</Typography> */}
            //   {/* </div>
            // ))} */}
            // </Grid>
            <div
              className='container'
              
              style={{
                marginTop: "50px",
                background: "white",
                padding: "30px",
                borderRadius: "8px",
                boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h1
                className='text-center mb-4'
                
                style={{
                  color: "black",
                }}
              >
                Document Review Results
              </h1>
              <div
                className='results-box'
                id='responseContent'
                style={{
                  background: "#fdfdfd",
                  padding: "20px",
                  borderRadius: "8px",
                }}
              >
                {responses && responses.length > 0 ? (
                  responses.map((result, index) => (
                    <div
                      key={index}
                      style={{
                        marginTop: "10px",
                        lineHeight: "1.6",
                        color: "black",
                        textAlign: "left",
                      }}
                      dangerouslySetInnerHTML={{ __html: formatResult(result) }}
                    />
                  ))
                ) : (
                  <p className='text-center'>No results found.</p>
                )}
              </div>
            </div>
          ) : null}
        </Grid>
      </Container>
    </>
  );
}

export default UploadDocument;
