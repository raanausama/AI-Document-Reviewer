// import background from "../assets/background.jpg";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Grid,
  Container,
  Button,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ResponsiveAppBar from "../navbar/NavBar";

// import Badge from "@mui/material/Badge";

function WhatisreviewIT({ token }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <ResponsiveAppBar token={token} />
      <Container>
  <Grid
    container
    mt={25}
    color={"black"}
    mb={25}
    p={6}
    sx={{
      background: "linear-gradient(to right, #012a61, #2997f7)", // Dark Blue to Sky Blue gradient
      borderRadius: "1rem",
      boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    }}
  >
    <Grid item xs={12}>
      <Typography
        variant="h2"
        className="animate-character4"
        sx={{ fontSize: "3.7rem", color: "#fafafa" }} // Light Gray text color
      >
        What is ReviewIT?
      </Typography>
    </Grid>
    <Grid item xs={12} mt={1}>
      <Typography variant="h6" color={"#fafafa"}> {/* Light Gray text */}
        A tool that automatically reviews your paper to identify its strengths and weaknesses similar to the way a reviewer does.
      </Typography>
    </Grid>
    {/* {!isSmallScreen && (
      <Grid item xs={12} mt={1}>
        <Typography variant="h6" textAlign="center" color={"#fafafa"}>
          Researchers and students make common mistakes in writing research papers. Such mistakes leads to the rejection of their papers. ReviewIT reviews your research paper to Identify the strengths and weaknesses of your paper similar to the way a reviewer does. Thus you can address the weaknesses to increase the chances of your paper acceptance.
        </Typography>
      </Grid>
    )} */}
    <Grid
      item
      xs={12}
      sx={{ display: "flex", justifyContent: "center" }}
      mt={3}
    >
      <Stack direction={isSmallScreen ? "column" : "row"} spacing={4}>
        <Button
          variant="contained"
          sx={{
            background: "linear-gradient(to right, #012a61, #2997f7)", // Dark Blue to Sky Blue button background
            color: "white",
            fontWeight: "bold",
            transformOrigin: "50% 10px",
            transition:
              "transform 200ms ease-out, background 500ms ease-in-out",
            "&:hover": {
              transform: "perspective(999px) translate3d(0px, -4px, 5px)",
              background: "#2997f7", // Sky Blue hover background
            },
          }}
          onClick={() => {
            navigate(token ? "/review-document" : "/login");
          }}
        >
          Get Started
        </Button>
        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          sx={{
            color: "white",
            background: "#2997f7", // Sky Blue background
            transformOrigin: "50% 10px",
            transition:
              "transform 200ms ease-out, background 500ms ease-in-out",
            "&:hover": {
              transform: "perspective(999px) translate3d(0px, -4px, 5px)",
              background: "#012a61", // Dark Blue hover background
              color: "white",
            },
          }}
          onClick={() => {
            navigate("/faq");
          }}
        >
          Learn More
        </Button>
      </Stack>
    </Grid>
  </Grid>
</Container>

    </>
  );
}

export default WhatisreviewIT;
