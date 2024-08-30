import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme } from "@mui/material";
import "firebase/compat/auth";
import { signInWithGoogle } from "../utils/firebase";
import { setUser } from "../redux/user";
import { LoadingButton } from "@mui/lab";
import {
  Stack,
  IconButton,
  InputAdornment,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
// import swal from "sweetalert";
import * as Yup from "yup";
import Iconify from "../components/Iconify";
import { apiPost } from "../utils/axios";
import logo from "../assets/REV.png";
import Swal from "sweetalert2";

// TODO remove, this demo shouldn't need to reset the theme.

export default function SignInForm({ navigate, dispatch }) {
  const headerStyle = {
    fontFamily: "Cinzel, serif", // Use a fancy font like 'Cinzel'
    fontWeight: "bold",
    fontSize: "2.4rem", // Adjust the size as needed
    background:
      "linear-gradient(153deg, rgba(51,49,43,1) 0%, rgba(168,123,76) 50%)", // Gradient color
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
  };

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // OTP Verification Modal
  // const [verficationModelOpen, setVerficationModalOpen] = useState(false);
  // const handleOpenVerficationModal = () => setVerficationModalOpen(true);
  // const handleCloseVerficationModal = () => setVerficationModalOpen(false);

  const initialValues = {
    email: "",
    password: "",
    remember: true,
  };
  console.log("initialValues", initialValues);

  const ValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ValidationSchema}
      onSubmit={async (values) => {
        console.log("values", values);

        try {
          // console.log("values submitted", values);
          console.log(values);
          const res = await apiPost("login", {
            email: values.email,
            password: values.password,
          });
          console.log("response", res);
          if (res.status === "ok") {
            localStorage.setItem("loginUser", JSON.stringify(res.user));
            dispatch(setUser(JSON.parse(localStorage.getItem("loginUser"))));
            Swal.fire({
              icon: "success",
              title: "You are successfully Sign In",
              text: "success",
              background: "linear-gradient(153deg, rgb(51, 49, 43) 30%, rgb(168, 123, 76) 80%)",
              color: "white",
              confirmButtonColor: "#a87b4c",
              
              
            }).then(() => {
              // Navigate to login page after registration
              navigate("/review-document"); // Redirect to login page
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Invalid credentails!",
              text: "error",
              background: "linear-gradient(153deg, rgb(51, 49, 43) 30%, rgb(168, 123, 76) 80%)",
              color: "white",
              confirmButtonColor: "#a87b4c",
            }).then(() => {});
          }
        } catch (error) {
          console.log(error);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        isSubmitting,
        touched,
        values,
      }) => (
        // <ThemeProvider theme={defaultTheme} >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          {/* <Typography component="h1" variant="h5" fontWeight="bold" color='white' mt={5}>
                DOCUMENT REVIEWER
              </Typography> */}
          <Box
            sx={{
              flexGrow: 0.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            mt={5}
          >
            <a href="/">
              {/* <img
                    src={logo}
                    alt="logo"
                    Link="/"
                    style={{
                      height: isSmallScreen ? "8vh" : "8vh",
                      width: isSmallScreen ? "25vh" : "25vh",
                    }}
                  /> */}
              <Typography style={headerStyle}>ReviewIT</Typography>
            </a>
            {/* <Typography variant="h5" sx={{fontWeight: 'bold',}}>𝓡𝓔𝓥𝓘𝓔𝓦 𝓘𝓣</Typography> */}
          </Box>
          <Box
            sx={{
              marginTop: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "20px",
              // color: 'white'
            }}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar> */}

            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="email"
                    size="medium"
                    id="outlined-register-2"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    helperText={touched.email && errors.email}
                    required
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.email && errors.email)}
                    // InputProps={{
                    //   style: { color: 'white', borderColor: 'white', border: '0px solid white'  } // Set the text color to white
                    // }}
                    // InputLabelProps={{
                    //   style: { color: 'white', borderColor: 'white'},
                    //   // Set the label color to white
                    // }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    size="medium"
                    id="outlined-12"
                    label="Password"
                    variant="outlined"
                    helperText={touched.password && errors.password}
                    required
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    //   value={values.password}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            <Iconify
                              icon={
                                showPassword
                                  ? "eva:eye-fill"
                                  : "eva:eye-off-fill"
                              }
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
                onClick={handleSubmit}
                sx={{
                  borderRadius: "30px",
                  mt: 3,
                  mb: 2,
                  background:
                    "linear-gradient(153deg, rgba(51,49,43,1) 0%, rgba(168,123,76) 50%)",
                }}
              >
                Login
              </LoadingButton>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link
                    style={{ cursor: "pointer" }}
                    variant="subtitle2"
                    underline="hover"
                    onClick={() => navigate("/forgot-password")}
                  >
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
              <Divider sx={{ my: 3 }}>
                <Typography variant="body2">OR</Typography>
              </Divider>
              <Stack
                direction="column"
                spacing={1}
                sx={{
                  marginBottom: "20px !important",
                  margintop: "1px !important",
                }}
              >
                <Button
                  variant="contained"
                  sx={{ textTransform: "none", bgcolor: "white" }}
                  fullWidth
                  onClick={() => {
                    signInWithGoogle(navigate, dispatch);
                  }}
                  size="large"
                  color="inherit"
                  startIcon={
                    <Iconify
                      icon="eva:google-fill"
                      color="#DF3E30"
                      width={22}
                      height={22}
                    />
                  }
                >
                  Login with Google
                </Button>
              </Stack>
            </Box>
          </Box>
          {/* <Copyright sx={{ mt: 5 }} /> */}
        </Container>
        // </ThemeProvider>
      )}
    </Formik>
  );
}
