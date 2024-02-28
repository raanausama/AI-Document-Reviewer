// import background from "../assets/background.jpg";
import { Typography, Grid, Container, Button, Stack,  useMediaQuery,useTheme } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// import Badge from "@mui/material/Badge";

function Homepage() {
  const shapeStyles = {
    bgcolor: "White",
    width: "70px",
    height: "40px",
    borderRadius: "12px",
    color: "#344767",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    fontSize: "0.95rem",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: { xs: "-330%", sm: "-200%" },
    right: { xs: "-300%", sm: "-400%" },
  };
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // const rectangle = (
  //   <Box component="span" sx={shapeStyles}>
  //     PRO
  //   </Box>
  // );
  return (
    <>
      <Grid container mt={35} color={'white'} mb={25}>
        <Grid item xs={12}>
          <Typography variant="h2" sx={{fontSize: '3.5rem'}}> AI Document Reviewer</Typography>
        </Grid>
        {!isSmallScreen &&
        <Grid item xs={12} mt={3}>
          <Typography variant="h6"> The most advanced AI Document Reviewer. Experience the revolution now.</Typography>
        </Grid>
        }
        <Grid item  xs={12} sx={{display: 'flex', justifyContent:'center'}} mt={3}>
          <Stack direction='row' spacing={4}>
            <Button variant="contained" sx={{backgroundColor:"#FFCF87", color:"#11357C", fontWeight: 'bold'}}>Get Started</Button>
            <Button endIcon={<ArrowForwardIcon />} sx={{color:"white"}}>Learn More</Button>
          </Stack>
        </Grid>
       
      </Grid>
      
    </>
  );
}

export default Homepage;
