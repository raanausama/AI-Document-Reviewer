import { BrowserRouter as Routers, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "../home";
import UploadDocument from "../upload";
import Register from "../register";
import LogIn from "../signin";
import WhatisreviewIT from "../pages/WhatisreviewIT";
import Howitworks from "../pages/Howitworks";
import Price from "../pages/Pricing";
import Faqs from "../pages/Faqs";

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
          <Route exact path="/what-is-reviewit" element={<WhatisreviewIT />} />
          <Route exact path="how-it-works" element={<Howitworks/>}/>
          <Route exact path="pricing" element={<Price/>}/>
          <Route exact path="faq" element={<Faqs/>}/>
        </Routes>
      </Routers>
    </>
  );
}
export default Router;
