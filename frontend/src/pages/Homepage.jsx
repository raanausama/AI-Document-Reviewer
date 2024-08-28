
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
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import heroimage from "../assets/hero-image.jpg"

function Homepage({ token }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Container>
        <Grid
          container
          mt={20}
          mb={15}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Grid item xs={12} sx={{ position: "relative", textAlign: "left" }}>
            <img
              src={heroimage}
              alt="Hero Image"
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "100vh",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: { xs: "10%", sm: "15%", md: "20%", lg: "20%" },
                left: { xs: "3%", sm: "3%", md: "3%" },
                color: "white",
                textAlign: "left",
                width: { xs: "40%", sm: "42%", md: "40%" },
              }}
            >
              <Typography
                className="animate-character"
                variant="h2"
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
                ReviewIT
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontSize: {
                    xs: "0.7rem",
                    sm: "0.9rem",
                    md: "1rem",
                    lg: "1.3rem",
                  },
                  marginBottom: "1rem",
                  color: "#212223",
                  textWrap: " break-word",
                }}
              >
                Peer Review your research paper and Increase the chances of your
                paper acceptance{" "}
                <span className="animate-character">by 50%</span>
              </Typography>
              {!isSmallScreen && (
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: {
                      xs: "1.2rem",
                      sm: "0.9rem",
                      md: "1rem",
                      lg: "1.3rem",
                    },
                    marginBottom: "2rem",
                    color: "#212223",
                  }}
                >
                  ReviewIT helps you identify the strengths and weaknesses of
                  your paper before you submit it to a journal or conference.
                </Typography>
              )}
              <Stack
                direction={isSmallScreen ? "column" : "row"}
                spacing={1}
                mt={2}
              >
                <Button
                  variant="contained"
                  sx={{
                    background: "#a87b4c",
                    color: "white",
                    fontWeight: "bold",
                    transformOrigin: "50% 10px",
                    transition:
                      "transform 200ms ease-out, background 500ms ease-in-out",
                    "&:hover": {
                      transform:
                        "perspective(999px)  translate3d(0px, -4px, 5px)",
                      background: "#CBBAA8",
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
                    background: "#CBBAA8",
                    transformOrigin: "50% 10px",
                    transition:
                      "transform 200ms ease-out, background 500ms ease-in-out",
                    "&:hover": {
                      transform:
                        "perspective(999px)  translate3d(0px, -4px, 5px)",
                      background: "#a87b4c",
                      color: "#212223",
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
                  onClick={ () =>  {navigate('/what-is-reviewit');  }}
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
