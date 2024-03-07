// import background from "../assets/background.jpg";
import { useState } from "react";
import { Typography, Grid, Container, Button, Stack,  useMediaQuery,useTheme } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ResponsiveAppBar from "../navbar/NavBar";
import UploaderDropzone from "../pages/Dropzone";

// import Badge from "@mui/material/Badge";

function UploadDocument({token}) {
 console.log('UploadDocumenttoken',token)
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [files, setFiles] = useState({
    doc: {}
  });
  const [done, setDone] = useState()

  return (
    <>
    <ResponsiveAppBar token={token}/>
      <Grid container mt={35} color={'white'} mb={25}>
        <Grid item xs={12}>
          <Typography variant="h2" sx={{fontSize: '3.5rem'}}> AI Document Reviewer</Typography>
        </Grid>
        {/* {!isSmallScreen &&
        <Grid item xs={12} mt={3}>
          <Typography variant="h6"> The most advanced AI Document Reviewer. Experience the revolution now.</Typography>
        </Grid>
        } */}
        <Grid item  xs={12} sx={{display: 'flex', justifyContent:'center'}} mt={3}>
          {/* <Stack direction='row' spacing={4}>
            <Button variant="contained" sx={{backgroundColor:"#FFCF87", color:"#11357C", fontWeight: 'bold'}}>Get Started</Button>
            {/* <Button endIcon={<ArrowForwardIcon />} sx={{color:"white"}}>Learn More</Button> */}
          {/* </Stack>  */}
          <UploaderDropzone  name="passport" setFiles={setFiles} files={files}setDone={setDone} token={token}/>
        </Grid>
       
      </Grid>
      
    </>
  );
}

export default UploadDocument;
