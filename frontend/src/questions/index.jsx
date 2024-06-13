import { Typography, Grid, Container, Stack,  } from "@mui/material";

function CommonQuestions({repo}) {
  return (
    <>
    <Container maxWidth={false} sx={{ mt: repo === 'faqs' ? 20 : 3 }} >
        <Grid container  sx={{backgroundColor:'#F5B69D', color:'#2A3055', borderRadius: '15px', padding: 2}}  >
            <Grid item xs={12} md={4} mb={{ xs: 0, md: 20 }} mt={5}>
                <Stack textAlign='Left'>
                    <Typography variant='body2'> FAQ </Typography>
                    <Typography variant='h4' fontWeight='bold'> Common Questions </Typography>
                    <Typography variant='body4'> Here are some common questions users ask frequently. </Typography>

                </Stack>
            </Grid>
            <Grid item xs={12} md={8} mt={{ xs: 5, md: 5 }}>
                <Stack textAlign='Left'>
                    <Typography variant='h5' fontWeight='bold'> How secure is my paper/manuscript?</Typography>
                    <Typography variant='body1' mt={2}>Your paper/manuscript will never leave our servers. We prioritize the security and privacy of your data over everything else.</Typography>
                    <Typography variant='h5' mt={2} fontWeight='bold'> What AI models ReviewIT uses?</Typography>
                    <Typography variant='body1' mt={2}>We us a variety of AI and generative AI models. However, rest assured, we do not use customer's data to train or retrain our AI models.</Typography>
                    <Typography variant='h5' mt={2} fontWeight='bold'> Why is there no free trail?</Typography>
                    <Typography variant='body1' mt={2}>Financial gain is not the primary objective behind developing this tool. We developed this tool to help researchers especially Phd students to evaluate the quality of their papers. Charging the nominal fee help us to run our services.</Typography>
                    <Typography variant='h5' mt={2} fontWeight='bold'> How to contact the team behind ReviewIT?</Typography>
                    <Typography variant='body1' mt={2}>You can contact us by sending us email at customersupport@zaytrics.com.</Typography>
                </Stack>
            </Grid>

        </Grid>
        </Container>
      
    </>
  );
}

export default CommonQuestions;
