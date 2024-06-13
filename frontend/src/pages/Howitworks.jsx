// import background from "../assets/background.jpg";
import { useNavigate } from 'react-router-dom';
import { Typography, Grid, Container, Button, Stack, useMediaQuery, useTheme, Box, Card, CardActions, CardContent, Divider } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ResponsiveAppBar from '../navbar/NavBar';
import { ArrowDownward, ArrowForward } from '@mui/icons-material';

// import Badge from "@mui/material/Badge";

function Howitworks({token}) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
    <ResponsiveAppBar/>
    <Container>
      <Grid container sx={{mt: { xs: 15, sm: 15, md:35 }}} color={'white'} mb={25} display='flex' justifyContent='center'>
        <Grid item xs={12} mb={3}>
          <Typography variant="h2" className="animate-character" sx={{fontSize: '3.7rem'}}> How it Works?</Typography>
        </Grid>
        <Grid item xs={12} md={3}>
            <Card variant="outlined" sx={{background:"linear-gradient(to right, #c0c0c0,#939897 )"}}>
                <CardContent>
                    <Typography variant="h6" color="text.primary" gutterBottom>
                        Submit Papper
                    </Typography>
                    <Divider/>
                    <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                        - Simply upload/submit your paper
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                        &nbsp;
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
        <Grid item display='flex' alignItems='center' >
        {isSmallScreen ? (
            <ArrowDownward sx={{mt: 3, mb:3}} fontSize="large" color="white" />
          ) : (
            <ArrowForward  fontSize="large" color="white" />
          )}
        </Grid>
        <Grid item xs={12} md={3}>
            <Card variant="outlined" sx={{background:"linear-gradient(to right, #c0c0c0,#939897 )"}}>
                <CardContent>
                    <Typography variant="h6" color="text.primary" gutterBottom>
                        Understand Review
                    </Typography>
                    <Divider/>
                    <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                        <div>- Review will be generated</div>
                        <div>-Try to understand the review</div>
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
        <Grid item display='flex' alignItems='center'>
        {isSmallScreen ? (
            <ArrowDownward sx={{mt: 3, mb:3}}  fontSize="large" color="white" />
          ) : (
            <ArrowForward fontSize="large" color="white" />
          )}
        </Grid>
        <Grid item xs={12} md={3} >
            <Card variant="outlined" sx={{background:"linear-gradient(to right, #c0c0c0,#939897 )"}}>
                <CardContent>
                    <Typography variant="h6" color="text.primary" gutterBottom>
                        Export Review
                    </Typography>
                    <Divider/>
                    <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                        - You can export the review for later use.
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
        
        <Grid item  xs={12} sx={{display: 'flex', justifyContent:'center'}} mt={5}>
          <Stack direction={isSmallScreen ? 'column' : 'row'} spacing={4}>
            <Button variant="contained" sx={{ background: "linear-gradient(to right, #E79A3F, #C8B575)", color:"white", fontWeight: 'bold'}} onClick={ () =>  {navigate(token ? '/review-document' : '/login');  }}>Get Started</Button>
            {/* <Button endIcon={<ArrowForwardIcon />} sx={{color:"white"}}>Learn More</Button> */}
          </Stack>
        </Grid>
      </Grid>
      </Container>
      
    </>
  );
}

export default Howitworks;
