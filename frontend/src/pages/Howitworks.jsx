// import background from "../assets/background.jpg";
import { useNavigate } from 'react-router-dom';
import { Typography, Grid, Container, Button, Stack, useMediaQuery, useTheme, Card, CardContent, Divider } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ResponsiveAppBar from '../navbar/NavBar';
import { ArrowDownward, ArrowForward } from '@mui/icons-material';

function Howitworks({token}) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const cardStyle = {
    background: "linear-gradient(to right, #cbbaa8, #bc9d6e)",
    color: "#212223",
    height: { xs: 'auto', md: '200px' }, // Equal height for all cards on medium and above screens
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
    boxSizing: 'border-box',
    borderRadius: '10px',
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
  };

  return (
    <>
      <ResponsiveAppBar token={token} />
      <Container>
        <Grid container sx={{ mt: { xs: 15, sm: 15, md: 25 } }} color={'white'} mb={25} display='flex' justifyContent='center'>
          <Grid item xs={12} mb={3}>
            <Typography variant="h2" className="animate-character" sx={{ fontSize: { xs: '2.5rem', md: '3.7rem' } }}> How it Works?</Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card variant="outlined" sx={cardStyle}>
              <CardContent>
                <Typography variant="h6" color="inherit" gutterBottom>
                  Submit Paper
                </Typography>
                <Divider sx={{ background: '#e9e9e9', mb: 1 }} />
                <Typography sx={{ fontSize: 14 }} color="inherit" gutterBottom>
                  - Simply upload/submit your paper
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item display='flex' alignItems='center'>
            {isSmallScreen ? (
              <ArrowDownward sx={{ mt: 3, mb: 3 , color:"#212223" }} fontSize="large" />
            ) : (
              <ArrowForward fontSize="large" sx={{color:"#212223"}} />
            )}
          </Grid>
          <Grid item xs={12} md={3}>
            <Card variant="outlined" sx={cardStyle}>
              <CardContent>
                <Typography variant="h6" color="inherit" gutterBottom>
                  Understand Review
                </Typography>
                <Divider sx={{ background: '#e9e9e9', mb: 1 }} />
                <Typography sx={{ fontSize: 14 }} color="inherit" gutterBottom>
                  <div>- Review will be generated</div>
                  <div>- Try to understand the review</div>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item display='flex' alignItems='center'>
            {isSmallScreen ? (
              <ArrowDownward sx={{ mt: 3, mb: 3, color:"#212223" }} fontSize="large"  />
            ) : (
              <ArrowForward fontSize="large" color="inherit" sx={{color:"#212223"}} />
            )}
          </Grid>
          <Grid item xs={12} md={3}>
            <Card variant="outlined" sx={cardStyle}>
              <CardContent>
                <Typography variant="h6" color="inherit" gutterBottom>
                  Export Review
                </Typography>
                <Divider sx={{ background: '#e9e9e9', mb: 1 }} />
                <Typography sx={{ fontSize: 14 }} color="inherit" gutterBottom>
                  - You can export the review for later use.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }} mt={5}>
            <Stack direction={isSmallScreen ? 'column' : 'row'} spacing={4}>
              <Button variant="contained" sx={{ background: "linear-gradient(to right, #a87b4c, #bc9d6e)", color: "white", fontWeight: 'bold' }} onClick={() => { navigate(token ? '/review-document' : '/login'); }}>Get Started</Button>
              {/* <Button endIcon={<ArrowForwardIcon />} sx={{color:"white"}}>Learn More</Button> */}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Howitworks;
