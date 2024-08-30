import axios from "axios";
import Swal from "sweetalert2";
// import { logout } from './logout';
// ----------------------------------------------------------------------

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("error.response.data.message", error.response.data.message);

      Swal.fire({
        icon:"error",
        title: error.response.data.message,
        // "Your Session Has Expired Please Login Again!",  
        text:"error",
        background: "linear-gradient(153deg, rgb(51, 49, 43) 30%, rgb(168, 123, 76) 80%)",
        color: "white",
        confirmButtonColor: "#a87b4c",
        confirmButtonText: "Try Again",
      }
      ).then(() => {
        // logout();
        // return <Navigate to="/login" />;
      });
    } else {
      swal("Oops...", "Server Error!", "error").then(() => {});
    }
    return Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    );
  }
);

export const apiGet = async (api, token) => {
  const headers = {
    "Content-Type": "application/json",
    token,
  };
  const res = await axiosInstance.get(
    `${import.meta.env.VITE_APP_SERVER_URL}/${api}`,
    {
      headers,
    }
  );
  return res.data;
};

export const apiPost = async (api, body, token) => {
  const headers = {
    "Content-Type": "application/json",
    token,
  };
  const res = await axiosInstance.post(
    `${import.meta.env.VITE_APP_SERVER_URL}/${api}`,
    body,
    {
      headers,
    }
  );
  return res.data;
};
export const apiPut = async (api, body, token) => {
  const headers = {
    "Content-Type": "application/json",
    token,
  };
  const res = await axiosInstance.put(
    `${import.meta.env.VITE_APP_SERVER_URL}/${api}`,
    body,
    {
      headers,
    }
  );
  return res.data;
};

export default axiosInstance;
