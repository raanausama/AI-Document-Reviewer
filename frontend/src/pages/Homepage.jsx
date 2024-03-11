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
      <Grid container mt={35} color={'white'} mb={25}>
        <Grid item xs={12}>
          <Typography className="animate-character" variant="h2" sx={{fontSize: '3.5rem'}}> AI Document Reviewer</Typography>
        </Grid>
        {!isSmallScreen &&
        <Grid item xs={12} mt={3}>
          <Typography variant="h6"> The most advanced AI Document Reviewer. Experience the revolution now.</Typography>
        </Grid>
        }
        <Grid item  xs={12} sx={{display: 'flex', justifyContent:'center'}} mt={3}>
          <Stack direction='row' spacing={4}>
            <Button variant="contained" sx={{ background: "linear-gradient(to right, #E79A3F, #C8B575)", color:"white", fontWeight: 'bold'}} onClick={ () =>  {navigate(token ? '/review-document' : '/login');  }}>Get Started</Button>
            <Button endIcon={<ArrowForwardIcon />} sx={{color:"white"}}>Learn More</Button>
          </Stack>
        </Grid>
       
      </Grid>
      
    </>
  );
}

export default Homepage;
