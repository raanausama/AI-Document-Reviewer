import firebase from "firebase/compat/app";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import "firebase/compat/auth";
import { apiGet } from "./axios";
import { setUser } from "../redux/user";

const firebaseConfig = {
  apiKey: "AIzaSyAanLtSVmeiOxhkEvoRWWN170m1PuT8ZEg",
  authDomain: "documentreviewer-bdab6.firebaseapp.com",
  projectId: "documentreviewer-bdab6",
  storageBucket: "documentreviewer-bdab6.appspot.com",
  messagingSenderId: "985340900113",
  appId: "1:985340900113:web:036ded0ba1b591c3f512b0",
  measurementId: "G-NB16YS48YJ",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const handleCheckEmailGoogleSingin = async (email, navigate, dispatch) => {
  try {
    const res = await apiGet(`login/checkemailgooglesignin?email=${email}`);
    // console.log("res", res.user)
    if (res.status === "ok") {
      dispatch(setUser(res.user));
      navigate('/review-document');
    } else {
      swal(
        "Oops...",
        "Your email address is not registered to our system!",
        "error"
      ).then(() => {});
    }
  } catch (error) {
    // console.log(error);
  }
};

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = (navigate, dispatch) =>
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      // console.log("result", result.user._delegate.email)

      const res = handleCheckEmailGoogleSingin(
        result.user._delegate.email,
        navigate,
        dispatch
      );
    })
    .catch((error) => {
      console.log(error);
    });

export default firebase;
