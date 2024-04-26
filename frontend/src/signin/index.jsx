
import { createTheme } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SignInForm from "../pages/SigninFrom";

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
