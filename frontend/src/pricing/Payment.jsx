import { Stack, Grid, Container, Typography } from "@mui/material";
import StripeContainer from "./StripeContainer";

/* eslint-disable */
const Payment = ({ user }) => {
  console.log("user in payment", user);

  const headerStyle = {
    fontFamily: "Cinzel, serif", // Use a fancy font like 'Cinzel'
    fontWeight: "bold",
    fontSize: "2.4rem", // Adjust the size as needed
    background:
      "linear-gradient(90deg, rgba(1,42,97,1) 30%, rgba(41,151,247,1) 100%)", // Gradient color
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
  };

  return (
    // <Fade direction="center">
    <>
      <Container maxWidth={false}>
        <Grid container spacing={1}>
          <Grid item xs={12} display='flex' justifyContent='center'>
            <Stack
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant='h4'
                mt={3}
                mb={3}
                color={"black"}
                style={headerStyle}
              >
                ReviewMyPaper
              </Typography>
              <StripeContainer />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
    // </Fade>
  );
};

export default Payment;
