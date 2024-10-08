// import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { clearUser } from "../redux/user";

import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Menu,
  Container,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import gsap from "gsap";
// import logo from "../assets/REV. png";
import logo from "../assets/testlogo.png";
import logo1 from "../assets/reviewmylogo.png";
// import {styled} from '@mui/system';
// import SignIn from "../../pages/SignIn";

function ResponsiveAppBar({ token }) {
  const dispatch = useDispatch();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();
  const handleLogout = () => {
    // Dispatch the clearUser action to logout the user
    dispatch(clearUser());
    // Optionally, you can also close any menu or modal after logout

    // Redirect the user to the login page
    navigate("/login");
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const onEnter = ({ currentTarget }) => {
    gsap.to(currentTarget, { scale: 1.2 });
  };

  const onLeave = ({ currentTarget }) => {
    gsap.to(currentTarget, { scale: 1 });
  };

  const pages = isSmallScreen
    ? [
        "What is ReviewMyPaper?",
        "How it works?",
        "Pricing",
        "FAQ",
        token ? "Logout" : "Login",
        "Register",
      ]
    : ["What is ReviewMyPaper?", "How it works?", "Pricing", "FAQ"];

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

  return (
    <AppBar
      position='absolute'
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        borderBottom: "0.1px solid #ab9a9a",
        background: "transparent",
      }}
    >
      {/* <SignIn open={viewModalOpen} handleClose={handleCloseModal} /> */}
      <Container maxWidth='100%'>
        <Toolbar disableGutters>
          {/* <AdbIcon  /> */}
          <Box
            sx={{
              flexGrow: 0.5,
              display: { xs: "flex" },
              alignItems: "center",
            }}
          >
            <Link
              to='/'
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={logo1}
                alt='logo'
                style={{ height: "100px", width: "105px" }}
              />
              {/* <Typography style={headerStyle}>ReviewMyPaper</Typography> */}
              {/* <Typography>Review IT</Typography> */}
            </Link>

            {/* <Typography variant="h5" color='#a87b4c' sx={{fontWeight: 'bold'}}>𝓡𝓔𝓥𝓘𝓔𝓦𝓘𝓣</Typography> */}
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: { xs: "flex-end", md: "none" },
              // background:'linear-gradient(to right, #88775d, #212223)',
            }}
          >
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon sx={{ color: "black", fontWeight: "bold" }} />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              PaperProps={{
                sx: { backgroundColor: "transparent", color: "black" },
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              MenuListProps={{
                disablePadding: true,
              }}
              sx={{
                display: { xs: "block", md: "none" },
                // background:'linear-gradient(to right, #88775d, #212223)',
                color: "#e9e9e9",
                borderRadius: "15px",
                padding: 4,
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  style={{
                    background: "linear-gradient(to right, #012a61, #2997f7)",
                  }}
                  key={page}
                  onClick={handleCloseNavMenu}
                >
                  {page === "Logout" ? (
                    // If the page is "Logout", render a link to handle logout
                    <Typography
                      onClick={handleLogout}
                      textAlign='center'
                      // fontFamily='Aktiv'
                      color='#e9e9e9'
                    >
                      {page}
                    </Typography>
                  ) : (
                    // Otherwise, render a Link component to the appropriate page
                    <Link
                      to={`/${page.toLowerCase().replace(/\s/g, "-")}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Typography
                        textAlign='center'
                        // fontFamily='Aktiv'
                        color='#e9e9e9'
                      >
                        {page}
                      </Typography>
                    </Link>
                  )}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 0.5, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                component={Link}
                to={`/${page.toLowerCase().replace(/\s/g, "-")}`}
                onClick={handleCloseNavMenu}
                sx={{
                  color: "#212223",
                  display: "block",
                  fontSize: "1rem",
                  fontWeight: "Bold",
                  padding: "1px 30px",
                  textTransform: "none",
                }}
                onMouseEnter={onEnter}
                onMouseLeave={onLeave}
              >
                {page}
              </Button>
            ))}
          </Box>

          {!isSmallScreen && (
            <>
              <Box sx={{ marginRight: 4 }}>
                <Button
                  sx={{
                    my: 2,
                    color: token ? "white" : "black",
                    display: "block",
                    fontSize: "1rem",
                    fontWeight: "Bold",
                    ml: "0.5em",
                    textTransform: "none",
                    background: token
                      ? "linear-gradient(to right, #012a61, #2997f7)"
                      : "transparent",
                  }}
                  onMouseEnter={onEnter}
                  onMouseLeave={onLeave}
                  onClick={token ? handleLogout : () => navigate("/login")}
                >
                  {" "}
                  {token ? "Logout" : "Login"}{" "}
                </Button>
              </Box>

              <Box>
                <Button
                  sx={{
                    color: "white",
                    display: token ? "none" : "block",
                    fontSize: "1rem",
                    fontWeight: "Bold",
                    background: "linear-gradient(to right, #012a61, #2997f7)",
                    textTransform: "none",
                  }}
                  onMouseEnter={onEnter}
                  onMouseLeave={onLeave}
                  onClick={() => navigate("/register")}
                >
                  {" "}
                  Register{" "}
                </Button>
              </Box>
            </>
          )}
          {/* <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <MenuIcon sx={{ color: "white", fontWeight: "bold" }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{
                mt: "45px",
              }}
              PaperProps={{
                sx: { backgroundColor: "transparent", color: "white" },
              }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  // component={Link}
                  to={`/${setting.toLowerCase().replace(/\s/g, "-")}`}
                  onClick={() => handleMenuItem(setting)}
                >
                  <Typography
                    textAlign="center"
                    color="inherit"
                    fontFamily="Aktiv"
                    // component={Link}
                    // to={`/${settings.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
