// import background from "../assets/background.jpg";
import { useNavigate } from 'react-router-dom';
import { Typography, Grid, Container, Button, Stack,  useMediaQuery,useTheme } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// import Badge from "@mui/material/Badge";

function Homepage({token}) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Container>
        <Grid container mt={35} color={'black'} mb={25}>
          <Grid item xs={12}>
              <Typography className="animate-character" variant="h2" sx={{fontSize: '3.7rem'}} mt={2}> ReviewIT</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6"> Peer Review your research paper and</Typography>
            </Grid>
          <Grid item xs={12}>
              <Typography variant="h6" > Increase the chances of your paper acceptance <span className="animate-character">by 50%</span></Typography>
            </Grid>
            {!isSmallScreen &&
            <Grid item xs={12} >
              <Typography variant="h6" textAlign='center'> ReviewIT helps you identify the strengths and weaknesses of your paper before you submit it to a journal or conference.</Typography>
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

export default Homepage;
