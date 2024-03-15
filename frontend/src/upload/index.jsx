// import background from "../assets/background.jpg";
import { useEffect, useState } from "react";
import { Typography, Grid, Container, Button, Stack,  useMediaQuery,useTheme } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ResponsiveAppBar from "../navbar/NavBar";
import UploaderDropzone from "../pages/Dropzone";

// import Badge from "@mui/material/Badge";

function UploadDocument({token}) {
//  console.log('UploadDocumenttoken',token)
 const [documentText, setDocumentText] = useState(''); // State to store the text content of the uploaded document
  const [words, setWords] = useState([]); // State to store the array of words
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [files, setFiles] = useState({
    doc: {}
  });
  const [done, setDone] = useState();
  console.log('files',files)
  console.log('done',done)
  const [responses, setResponses] = useState([]); // State to store the responses

  useEffect(() => {
    if (done) {
      // Perform API call or logic to fetch responses based on the uploaded document
      // For demo, I'll use a mock response
      const mockResponses = [
        {
          question: 'Evaluate the credibility and relevance of the sources used in the research paper.',
          response: 'Provide concise analysis on the credibility and relevance of the sources used.',
        },
        {
          question: 'Assess the coherence and logical flow of the research paper.',
          response: 'Provide a brief evaluation of the coherence and logical flow observed in the research paper.',
        },
        {
          question: 'Assess the coherence and logical flow of the research paper.',
          response: 'Provide a brief evaluation of the coherence and logical flow observed in the research paper.',
        },
        // Add more responses as needed
      ];
      setResponses(mockResponses);
    }
  }, [done]);

  return (
    <>
    <ResponsiveAppBar token={token}/>
      <Grid container mt={30} color={'white'} mb={5}>
        <Grid item xs={12}>
          <Typography className="animate-character" variant="h2" sx={{fontSize: '3.5rem'}}> AI Document Reviewer</Typography>
        </Grid>
        <Grid item xs={12} sx={{display: 'flex', justifyContent:'center'}} mt={3}>
          <UploaderDropzone setWords={setWords} words={words} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} setDocumentText={setDocumentText} documentText={documentText} name="passport" setFiles={setFiles} files={files} setDone={setDone} token={token}/>
        </Grid>
      </Grid>
      <Grid container mt={5} color={'white'} mb={25}>
        {done === 1 && responses.length > 0 && (
          <Grid item xs={12} mt={3}>
            <Typography variant="h4">Responses:</Typography>
            {responses.map((response, index) => (
              <div key={index}>
                <Typography variant="subtitle1"><strong>{response.question}</strong></Typography>
                <Typography variant="body1">{response.response}</Typography>
              </div>
            ))}
          </Grid>
        )}
      </Grid>
      
    </>
  );
}

export default UploadDocument;
