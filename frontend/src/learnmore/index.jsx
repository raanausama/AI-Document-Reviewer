// import background from "../assets/background.jpg";
import { Typography, Grid, Container, Button, Stack,  useMediaQuery,useTheme } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// import Badge from "@mui/material/Badge";

function LearnMore() {
  
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
    <Container maxWidth={false}>
        <Grid container mt={20} color={'white'} mb={15}>
          <Grid item xs={12}>
            <Typography variant="h2" className="animate-character" sx={{fontSize: '3.5rem'}}> Efficient Document Review with AI</Typography>
          </Grid>
          <Grid item  xs={12} sx={{display: 'flex', justifyContent:'center'}} mt={3}>
            <Stack direction='row' spacing={4}>
              <Button endIcon={<ArrowForwardIcon />}  sx={{background: "linear-gradient(to right, #E79A3F, #C8B575)", color:"white", fontWeight: 'bold'}}>Learn More</Button>
            </Stack>
          </Grid>
          
        </Grid>
      </Container>
      
    </>
  );
}

export default LearnMore;
