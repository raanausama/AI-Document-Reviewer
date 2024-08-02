// import background from "../assets/background.jpg";
import { useNavigate } from 'react-router-dom';
import { Typography, Grid, Container, Button, Stack,  useMediaQuery,useTheme } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ResponsiveAppBar from '../navbar/NavBar';

// import Badge from "@mui/material/Badge";

function WhatisreviewIT({token}) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
    <ResponsiveAppBar token={token}/>
    <Container>
      <Grid container mt={35} color={'white'} mb={25}>
      <Grid item xs={12}>
          <Typography variant="h2" className="animate-character" sx={{fontSize: '3.7rem'}}> What is ReviewIT?</Typography>
        </Grid>
        <Grid item xs={12} mt={1}>
          <Typography variant="h6"> A tool that automatically peer review your research paper.</Typography>
        </Grid>
        {!isSmallScreen &&
        <Grid item xs={12} mt={1}>
          <Typography variant="h6" textAlign='center'> Researchers and students make common mistakes in writing research papers. Such mistakes leads to the rejection of their papers.
          ReviewIT reviews your research paper to Identify the strengths and weaknesses of your paper similar to the way a reviewer does. Thus you can address the weaknesses to increase the chanes of your paper acceptance.</Typography>
        </Grid>
        }
        <Grid item  xs={12} sx={{display: 'flex', justifyContent:'center'}} mt={3}>
          <Stack direction={isSmallScreen ? 'column' : 'row'} spacing={4}>
            <Button variant="contained" sx={{ background: "linear-gradient(to right, #E79A3F, #C8B575)", color:"white", fontWeight: 'bold'}} onClick={ () =>  {navigate(token ? '/review-document' : '/login');  }}>Get Started</Button>
            <Button endIcon={<ArrowForwardIcon />} sx={{color:"white"}}>Learn More</Button>
          </Stack>
        </Grid>
      </Grid>
      </Container>
      
    </>
  );
}

export default WhatisreviewIT;
