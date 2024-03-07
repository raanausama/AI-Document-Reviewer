import axios from "axios";
import swal from "sweetalert";
// import { logout } from './logout';
// ----------------------------------------------------------------------

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      swal(
        "Oops...",
        "Your Session Has Expired Please Login Again!",
        "error"
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
