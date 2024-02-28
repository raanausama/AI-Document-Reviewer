import {
  BrowserRouter as Routers,
  Route,
  Routes,
  useNavigate,
  redirect,
} from "react-router-dom";
// import Contact from './pages/Contact'
// import Menu from './pages/Menu'
// import Pagenotfound from "./pages/Pagenotfound";
// import About from './pages/About'
// import Signin from "./pages/Signin";
// import Signup from "./pages/Signup";
// import Resetpassword from "./components/Resetpassword";
import { Box } from "@mui/material";
// import { useEffect } from "react";
// import ProtectedRoute from "./middleware/ProtectedRoute";
import Home from "../home";

function Router() {
  // const navigate = useNavigate;

  //
  return (
    <>
      <Routers>
          <Routes>
            <Route exact path="/" element={<Home />} />

            {/* <Route path="/login" element={<Signin />} /> */}

            {/* <Route path="/contact" element={<Contact />} /> */}
            {/* <Route path="/menu" element={<Menu />} /> */}
            {/* <Route path="/about" element={<About />} /> */}
            {/* <Route path="/*" element={<Pagenotfound />} /> */}
            {/* <Route path="/register" element={<Signup />} /> */}
            {/* <Route path="/login" element={<Signin />} />
            <Route path="/login/reset" element={<Resetpassword />} /> */}
          </Routes>
      </Routers>
    </>
  );
}
export default Router;
