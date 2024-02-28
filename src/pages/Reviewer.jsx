// import background from "../assets/background.jpg";
import { Typography, Grid, Container, Button, Stack,  useMediaQuery,useTheme } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// import Badge from "@mui/material/Badge";

function Reviewer() {
 
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Grid container mt={10} color={'white'} mb={10}>
        <Grid item xs={12}>
          <Typography variant="h2" sx={{fontSize: '3.5rem'}}> REVIEWER</Typography>
        </Grid>
        {/* {!isSmallScreen &&
        <Grid item xs={12} mt={3}>
          <Typography variant="h6"> The most advanced AI Document Reviewer. Experience the revolution now.</Typography>
        </Grid>
        } */}
        <Grid item  xs={12} sx={{display: 'flex', justifyContent:'center'}} mt={3}>
          <Stack  direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <Button  sx={{color:"white", fontWeight: 'bold'}}>Home </Button>
            <Button  sx={{color:"white", fontWeight: 'bold'}}>About </Button>
            <Button  sx={{color:"white", fontWeight: 'bold'}}>Services </Button>
            <Button  sx={{color:"white", fontWeight: 'bold'}}>AI Reviewer </Button>
            <Button  sx={{color:"white", fontWeight: 'bold'}}>Contact </Button>
          </Stack>
        </Grid>
       
      </Grid>
      
    </>
  );
}

export default Reviewer;
