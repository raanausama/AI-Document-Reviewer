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
import { apiGet } from "../utils/axios";

// import Badge from "@mui/material/Badge";

function UploadDocument({ token, user }) {
  console.log("user is", user.email);
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState("");


  



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
          // console.log("File uploaded successfully", response.data);
          setResponses(response.data);
          setDone(true);
          setLoading(false);
        } else {
          setDone(true);
          setLoading(false);
          Swal.fire({
            icon: "warning",
            title: "Please login to Continue",
            text: "Click OK to redirect to login page",
            background:
              "linear-gradient(to right, #012a61, #2997f7)",
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
  }, [files]);

  const downloadPdf = () => {
    const element = document.getElementById("responseContent");
    console.log("element", element);
    html2pdf().from(element).save("document-review-results.pdf");
  };
  const generatePDF = () => {
    const input = document.getElementById("responseContent");
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("document-review-results.pdf");
      })
      .catch((error) => console.error("Error generating PDF:", error));
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
                onClick={downloadPdf}
              >
                Download as PDF
              </Button>
            </Grid>
          ) : null}

          {done && responses?.length > 0 ? (
            <Grid item xs={12} mt={2}>
              {/* <Typography variant="h4">Responses:</Typography> */}
              {/* {responses.map((response, index) => (
              <div key={index}> */}
              <div
                id='responseContent'
                dangerouslySetInnerHTML={{ __html: responses }}
              />
              {/* <Typography variant="subtitle1"><strong>{responses}</strong></Typography> */}
              {/* <Typography variant="body1">{response}</Typography> */}
              {/* </div>
            ))} */}
            </Grid>
          ) : null}
        </Grid>
      </Container>
    </>
  );
}

export default UploadDocument;
