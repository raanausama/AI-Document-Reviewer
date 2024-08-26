// import background from "../assets/background.jpg";
import { useEffect, useState } from "react";
import { Typography, Grid, Container, Button, Stack,LinearProgress,  useMediaQuery,useTheme, CircularProgress } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ResponsiveAppBar from "../navbar/NavBar";
import UploaderDropzone from "../pages/Dropzone";
import ReactMarkdown from 'react-markdown';
import axios from "axios";
import LinearProgressWithLabel from '../utils/LinearProgressWithLabel'; // Import the component


// import Badge from "@mui/material/Badge";

function UploadDocument({token}) {
//  console.log('UploadDocumenttoken',token)
 const [documentText, setDocumentText] = useState(''); // State to store the text content of the uploaded document
  const [words, setWords] = useState([]); // State to store the array of words
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [files, setFiles] = useState({
    doc: {}
  });
  const [done, setDone] = useState();
  console.log('files',files)
  console.log('done',done)
  const [responses, setResponses] = useState([]); // State to store the responses
  const [progress, setProgress] = useState(0); // State for progress


  const handleFileUpload = async () => {
    setLoading(true);
    const formData = new FormData();
    
    // Assuming you have a single file in the doc array
    if (files.doc[0]) {
      formData.append('file', files.doc[0].file);
      formData.append('template', 'Analysis');
      formData.append('points', 'Report');
      console.log('formData', formData,`${import.meta.env.VITE_APP_SERVER_API_URL}`);
      try {
        const response = await axios.post(`${import.meta.env.VITE_APP_SERVER_API_URL}/rpr`, formData,{
          onUploadProgress: progressEvent => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percentCompleted);
          }
        });
        console.log('File uploaded successfully', response.data);
        setResponses(response.data);
        setDone(true);
        setLoading(false);
      } catch (error) {
        console.error('Error uploading file', error);
        setDone(false);
        setLoading(false);
      }
      finally {
        setLoading(false);
      }
    }
  };
  useEffect( () => {
    if (done && files.doc[0]) {
    handleFileUpload();
  }
  }, [done]);

  return (
    <>
    <Container>
    <ResponsiveAppBar token={token}/>
      <Grid container mt={30} color={'white'} mb={5}>
        <Grid item xs={12}>
          <Typography className="animate-character" variant="h2" sx={{fontSize: '3.5rem'}}> AI Document Reviewer</Typography>
        </Grid>
        <Grid item xs={12} display='flex' justifyContent='center' mt={3}>
          <UploaderDropzone setWords={setWords} words={words} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} setDocumentText={setDocumentText} documentText={documentText} name="passport" setFiles={setFiles} files={files} setDone={setDone} token={token}/>
        </Grid>
      </Grid>
      
      <Grid container mt={5} color={'white'} mb={20}>
      {loading && (
          <Grid item xs={12} >
            <LinearProgressWithLabel value={progress} />
          </Grid>
        )}
        {done && responses?.length > 0 ? (
          <Grid item xs={12} mt={3}>
            {/* <Typography variant="h4">Responses:</Typography> */}
            {/* {responses.map((response, index) => (
              <div key={index}> */}
              <div dangerouslySetInnerHTML={{ __html: responses }} />
                {/* <Typography variant="subtitle1"><strong>{responses}</strong></Typography> */}
                {/* <Typography variant="body1">{response}</Typography> */}
              {/* </div>
            ))} */}
          </Grid>
        ) : null }
      </Grid>
      </Container>
      
      
    </>
  );
}

export default UploadDocument;
