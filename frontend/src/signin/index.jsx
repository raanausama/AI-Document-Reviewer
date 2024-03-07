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
import { useDispatch } from 'react-redux';

import { LoadingButton } from "@mui/lab";
import { Autocomplete, IconButton, InputAdornment } from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import swal from "sweetalert";
import * as Yup from "yup";
import Iconify from "../components/Iconify";
import { apiPost } from "../utils/axios";
import SignInForm from "../pages/SigninFrom";
import AuthSocial from "../pages/AuthSocial";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function LogIn() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  return (
    <>
        <SignInForm navigate={navigate} dispatch={dispatch} />
    </>
  );
}
