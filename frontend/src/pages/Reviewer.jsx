// import background from "../assets/background.jpg";
import { Typography, Grid,Button, Stack,  useMediaQuery,useTheme } from "@mui/material";
import { useNavigate } from 'react-router-dom';

// import Badge from "@mui/material/Badge";

function Reviewer({token}) {
 
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <>
      <Grid container mt={10} color={'white'} mb={10}>
        <Grid item xs={12}>
          <Typography variant="h2" className="animate-character" sx={{fontSize: '3.5rem'}}> REVIEWER</Typography>
        </Grid>
        {/* {!isSmallScreen &&
        <Grid item xs={12} mt={3}>
          <Typography variant="h6"> The most advanced AI Document Reviewer. Experience the revolution now.</Typography>
        </Grid>
        } */}
        <Grid item  xs={12} sx={{display: 'flex', justifyContent:'center'}} mt={3}>
          <Stack  direction={{ xs: 'column', md: 'row' }} spacing={2}>
            {/* <Button  sx={{color:"white", fontWeight: 'bold'}} onClick={() => navigate('/')}>Home </Button> */}
            <Button  sx={{color:"white", fontWeight: 'bold'}} onClick={() => navigate('/what-is-reviewit')}>What is ReviewIT? </Button>
            <Button  sx={{color:"white", fontWeight: 'bold'}} onClick={() => navigate('/how-it-works')}>How it works? </Button>
            <Button  sx={{color:"white", fontWeight: 'bold'}} onClick={() => navigate('/pricing')}>Pricing </Button>
            {/* <Button  sx={{color:"white", fontWeight: 'bold'}} onClick={() => navigate('/testimonial')}>Testimonial </Button> */}
            <Button  sx={{color:"white", fontWeight: 'bold'}} onClick={() => navigate('/faq')}>Faqs </Button>
          </Stack>
        </Grid>
       
      </Grid>
      
    </>
  );
}

export default Reviewer;
