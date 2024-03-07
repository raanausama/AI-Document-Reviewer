// import background from "../assets/background.jpg";
import { Typography, Grid, Container, Stack,  } from "@mui/material";
// import AutoAwesomeIcon from '@mui/icons-material/AutoAwesomeIcon';

// import Badge from "@mui/material/Badge";

function CommonQuestions() {
  return (
    <>
    <Container maxWidth={false} mt={3}>
        <Grid container  sx={{backgroundColor:'#F5B69D', color:'#2A3055', borderRadius: '15px'}}  spacing={2}>
            <Grid item xs={12} md={4} mb={{ xs: 0, md: 20 }} mt={5}>
                <Stack textAlign='Left'>
                    <Typography variant='body2'> FAQ </Typography>
                    <Typography variant='h4' fontWeight='bold'> Common Questions </Typography>
                    <Typography variant='body4'> Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod </Typography>

                </Stack>
            </Grid>
            <Grid item xs={12} md={8} mt={{ xs: 5, md: 5 }}>
                <Stack textAlign='Left'>
                    <Typography variant='h5' fontWeight='bold'> What type of cars do you sell?</Typography>
                    <Typography variant='body1' mt={2}>Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod.</Typography>
                    <Typography variant='h5' mt={2} fontWeight='bold'> What type of cars do you sell?</Typography>
                    <Typography variant='body1' mt={2}>Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod.</Typography>
                    <Typography variant='h5' mt={2} fontWeight='bold'> What type of cars do you sell?</Typography>
                    <Typography variant='body1' mt={2}>Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod.</Typography>
                    <Typography variant='h5' mt={2} fontWeight='bold'> What type of cars do you sell?</Typography>
                    <Typography variant='body1' mt={2}>Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod.</Typography>
                    <Typography variant='h5' mt={2} fontWeight='bold'> What type of cars do you sell?</Typography>
                    <Typography variant='body1' mt={2} mb={8}>Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod.</Typography>
                </Stack>
            </Grid>

        </Grid>
        </Container>
      
    </>
  );
}

export default CommonQuestions;
