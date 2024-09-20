import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material";
import { useNavigate } from 'react-router-dom';

import { LoadingButton } from "@mui/lab";
import { IconButton, InputAdornment, useMediaQuery, useTheme  } from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import swal from "sweetalert";
import * as Yup from "yup";
import Iconify from "../components/Iconify";
import { apiPost } from "../utils/axios";
import logo  from '../assets/logo2.png'


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {

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

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const initialValues = {
    email: "",
    new_password: "",
    password_confirm: "",
  };
  console.log("initialValues", initialValues);

  const ValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),

    new_password: Yup.string()
      .required("New password is required")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#!@{}$%^'<>/().=+-]).{8,}$/,
        `Should contains at least 8 characters, \n one digit, \n one upper case, \n 
      one lower case and \n
      one special character' \n`
      ),
    password_confirm: Yup.string()
      .required("Confirm password is required")
      .test(
        "password_confirm",
        "Password does not match",
        (confirmPassword, allValue) => {
          const password = allValue.from[0].value.new_password;
          if (confirmPassword === password) {
            return true;
          }
          return false;
        }
      ),
  });

  const handleAdminCreate = async (values) => {
    try {
      const resp = await apiPost("admin/signup", {
        email: values.email,
        password: values.new_password,
      });
      swal("Success", "Admin created successfully", "success").then(() => {
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleNextStep = () => {
    swal({
      icon: 'success',
      title: 'Registration Successful!',
      text: 'You have successfully registered your account.',
    }).then(() => {
      // Navigate to the login page
      navigate('/login'); 
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ValidationSchema}
      onSubmit={async (values) => {
        console.log("values", values);
      
        try {
          console.log("values submitted", values);
          console.log(values)
          const res = await apiPost(`signup`, {values: values})
            console.log('response', res);
            if (res.status === 'ok') {
              // Registration successful
              // Show success message
              swal('Success', 'Registration successful', 'success').then(() => {
                // Navigate to login page after registration
                navigate('/login'); // Redirect to login page
              });
            } 
            if (res.status === 'exist') {
              // User already exists
              // Show error message
              swal('Oops...', 'Email already exists', 'error');
            } 
            if (res.status === 'error') {
              // Other error
              // Show error message
              swal('Error', 'An error occurred', 'error');
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
          <Container component="main" maxWidth="xs" sx={{}}>
            <CssBaseline />
            {/* <Typography component="h1" variant="h5" fontWeight="bold" color='white' mt={5}>
                DOCUMENT REVIEWER
              </Typography> */}
               <Box sx={{ flexGrow: 0.5, display: "flex", alignItems: 'center', justifyContent: 'center' }} mt={5}>
               <a href="/">
              {/* <Typography style={headerStyle}>ReviewIT</Typography> */}
              <img src= {logo} width={"120px"} height={"80px"}/>
            </a>
                {/* <Typography variant="h5" sx={{fontWeight: 'bold',}}>𝓡𝓔𝓥𝓘𝓔𝓦 𝓘𝓣</Typography> */}
              </Box>
            <Box
              sx={{
                marginTop: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '20px'
                // color: 'white'
              }}
              
            >
              {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar> */}
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
                
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} >
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
                      label="New Password"
                      variant="outlined"
                      helperText={touched.new_password && errors.new_password}
                      required
                      error={Boolean(
                        touched.new_password && errors.new_password
                      )}
                      fullWidth
                      //   value={values.password}
                      name="new_password"
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
                  <Grid item xs={12}>
                    <TextField
                      size="medium"
                      id="outlined-13"
                      label="Confirm Password"
                      variant="outlined"
                      fullWidth
                      helperText={
                        touched.password_confirm && errors.password_confirm
                      }
                      required
                      error={Boolean(
                        touched.password_confirm && errors.password_confirm
                      )}
                      //   value={values.confirm_password}
                      name="password_confirm"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type={showPasswordConfirm ? "text" : "password"}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                setShowPasswordConfirm(!showPasswordConfirm)
                              }
                              edge="end"
                            >
                              <Iconify
                                icon={
                                  showPasswordConfirm
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
                  {/* <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox value="allowExtraEmails" color="primary" />
                      }
                      label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                  </Grid> */}
                </Grid>
                <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
                onClick={handleSubmit}
                sx={{ borderRadius: '30px', mt: 3, mb: 2, background: "linear-gradient(153deg, #012a61 0%, #2997f7 50%)" }}
              >
              Sign Up
            </LoadingButton>
                <Grid container justifyContent="flex-end">
                Already have an account? 
                  <Grid item>
                    <Link variant="body2" underline="hover" style={{ cursor: 'pointer' }}
                    onClick={() => navigate('/login')}>
                     &nbsp;Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            {/* <Copyright sx={{ mt: 5 }} /> */}
          </Container>
        // </ThemeProvider>
      )}
    </Formik>
  );
}
