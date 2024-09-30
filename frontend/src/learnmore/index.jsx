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

// import Badge from "@mui/material/Badge";

function LearnMore() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Container maxWidth={false}>
        <Grid container mt={{ xs: 3, sm: 10 }} color={"white"} mb={5}>
          <Grid item xs={12}>
            <Typography
              variant='h2'
              className='animate-character4'
              sx={{ fontSize: "3.5rem" }}
            >
              {" "}
              Research Paper/Thesis Review
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "center" }}
            mt={3}
          >
            <Stack direction='row' spacing={4}>
              <Button
                endIcon={<ArrowForwardIcon />}
                sx={{
                  background: "linear-gradient(to right, #012a61, #2997f7)",
                  color: "white",
                  fontWeight: "bold",
                }}
                onClick={() => {
                  navigate("/what-is-reviewmypaper");
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

export default LearnMore;
