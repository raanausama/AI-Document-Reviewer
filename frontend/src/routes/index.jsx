import { BrowserRouter as Routers, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import { Box } from "@mui/material";
import Home from "../home";
import UploadDocument from "../upload";
import Register from "../register";
import LogIn from "../signin";

function Router() {
  // const navigate = useNavigate;
  const user = useSelector((state) => state.user); // Access the entire user state
  console.log("user", user.user);
  //
  return (
    <>
      <Routers>
        <Routes>
          {user?.user && user?.user?.token ? (
            <Route
              path="/review-document"
              element={<UploadDocument token={user?.user?.token} />}
            />
          ) : (
            <Route
              exact
              path="/"
              element={<Home token={user?.user?.token} />}
            />
          )}
           <Route
              exact
              path="/"
              element={<UploadDocument token={user?.user?.token} />}
            />
          <Route
            exact
            path="/home"
            element={<Home token={user?.user?.token} />}
          />
          {/* <Route
            exact
            path="/review-document"
            element={<UploadDocument token={user?.user?.token} />}
          /> */}
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<LogIn />} />
        </Routes>
      </Routers>
    </>
  );
}
export default Router;
