import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Grid,
  Container,
  Button,
  Stack,
  useMediaQuery,
  useTheme,
  Box,
  CircularProgress, // Import CircularProgress
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Banner from "../assets/banner.png";

function Homepage({ token }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate loading time of 2 seconds

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // Full height of the viewport
        }}
      >
        <CircularProgress size={"4rem"} sx={{ color: "#012a61" }} />{" "}
        {/* Circular loader */}
      </Box>
    );
  }

  return (
    <>
      <Container disableGutters={isSmallScreen}>
        <Grid
          container
          mt={15}
          mb={5}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Grid item xs={12} sx={{ position: "relative", textAlign: "left" }}>
            <img
              src={Banner}
              alt='Hero Image'
              style={{
                width: "100%",
                height: isSmallScreen ? "50vh" : "auto",
                maxHeight: "100vh",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: { xs: "25%", sm: "15%", md: "20%", lg: "20%" },
                left: { xs: "3%", sm: "3%", md: "3%" },
                color: "white",
                textAlign: "left",
                width: { xs: "40%", sm: "42%", md: "40%" },
              }}
            >
              <Typography
                className='animate-character4'
                variant='h2'
                sx={{
                  fontSize: {
                    xs: "1.4rem",
                    sm: "1.5rem",
                    md: "2.5rem",
                    lg: "3.5rem",
                  },
                  fontWeight: "bold",
                  marginBottom: "1rem",
                }}
              >
                ReviewMyPaper
              </Typography>
              <Typography
                variant='h6'
                sx={{
                  fontSize: {
                    xs: "0.7rem",
                    sm: "0.9rem",
                    md: "1rem",
                    lg: "1.3rem",
                  },
                  marginBottom: "1rem",
                  color: "#fafafa",
                  textWrap: " break-word",
                }}
              >
                Peer Review your research paper and Increase the chances of your
                paper acceptance{" "}
                <span className='animate-character4'>by 50%</span>
              </Typography>
              {!isSmallScreen && (
                <Typography
                  variant='h6'
                  sx={{
                    fontSize: {
                      xs: "1.2rem",
                      sm: "0.9rem",
                      md: "1rem",
                      lg: "1.3rem",
                    },
                    marginBottom: "2rem",
                    color: "#fafafa",
                  }}
                >
                  ReviewMyPaper helps you identify the strengths and weaknesses
                  of your paper before you submit it to a journal or conference.
                </Typography>
              )}
              <Stack
                direction={isSmallScreen ? "column" : "row"}
                spacing={1}
                mt={2}
              >
                <Button
                  variant='contained'
                  sx={{
                    background: "#012a61",
                    color: "white",
                    fontWeight: "bold",
                    transformOrigin: "50% 10px",
                    transition:
                      "transform 200ms ease-out, background 500ms ease-in-out",
                    "&:hover": {
                      transform:
                        "perspective(999px)  translate3d(0px, -4px, 5px)",
                      background: "#2997f7",
                    },
                    width: { xs: "70%", sm: "40%", md: "45%", lg: "100%" },
                    height: {
                      xs: "1.5rem",
                      sm: "2rem",
                      md: "3rem",
                      lg: "3rem",
                    },
                    fontSize: {
                      xs: "0.5rem",
                      sm: "9px",
                      md: "0.8rem",
                      lg: "1.1rem",
                    },
                  }}
                  onClick={() => {
                    navigate("/review-document");
                  }}
                >
                  Get Started
                </Button>
                <Button
                  variant='contained'
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    color: "white",
                    background: "#2997f7",
                    transformOrigin: "50% 10px",
                    transition:
                      "transform 200ms ease-out, background 500ms ease-in-out",
                    "&:hover": {
                      transform:
                        "perspective(999px)  translate3d(0px, -4px, 5px)",
                      background: "#012a61",
                      color: "white",
                    },
                    width: { xs: "60%", sm: "40%", md: "45%", lg: "100%" },
                    height: {
                      xs: "1.5rem",
                      sm: "2rem",
                      md: "3rem",
                      lg: "3rem",
                    },
                    fontSize: {
                      xs: "0.5rem",
                      sm: "9px",
                      md: "0.8rem",
                      lg: "1.1rem",
                    },
                    display: { xs: "none", sm: "flex" },
                  }}
                  onClick={() => {
                    navigate("/what-is-reviewmypaper");
                  }}
                >
                  Learn More
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Homepage;
