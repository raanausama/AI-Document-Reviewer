// import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useRef } from "react";
import { Box, AppBar, Toolbar, IconButton,Button, Typography , Menu, Container, MenuItem, useMediaQuery, useTheme} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import gsap from "gsap";
// import SignIn from "../../pages/SignIn";

// const pages = ["Home", "About", "Services", "AI Reviewer", "Contact"];
const settings = [
  "Dine In",
  "CSR",
  // "Blog",
  "Contact Us",
];

function ResponsiveAppBar({ homeData }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const onEnter = ({ currentTarget }) => {
    gsap.to(currentTarget, { scale: 1.2 });
  };

  const onLeave = ({ currentTarget }) => {
    gsap.to(currentTarget, { scale: 1 });
  };

  const [viewModalOpen, setViewModalOpen] = React.useState(false);

  const handleMenuItem = (setting) => {
    if (setting === "Sign In") {
      setViewModalOpen(true);
    }
    // if (setting === "Blog") {
    //   navigate("/blog");
    // }
    if (setting === "Contact Us") {
      navigate("#contact-footer");
    }
    if (setting === "CSR") {
      navigate("/csr");
    }
    if (setting === "Dine In") {
      navigate("/dinein");
    }
    if (setting === "Contact Us") {
      const footerElement = document.getElementById("footer");
      footerElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleCloseModal = () => {
    setViewModalOpen(false); // Close the modal
  };
  const pages = isSmallScreen ? ["Home", "About", "Services", "AI Reviewer", "Contact", "Login", "Register"] : ["Home", "About", "Services", "AI Reviewer", "Contact"];

  return (
    <AppBar
      position="absolute"
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        borderBottom: "0.1px solid #ab9a9a" ,
        background: 'transparent',
        mt:2

      }}
    >
      {/* <SignIn open={viewModalOpen} handleClose={handleCloseModal} /> */}
      <Container maxWidth="100%">
        <Toolbar disableGutters>
          {/* <AdbIcon  /> */}
          <Box sx={{ flexGrow: 0.5, display: { xs: "flex" } }}>
            {/* <a href="/">
              <img
                // src={mjrLogo}
                alt="logo"
                Link="/"
                style={{
                  height: isSmallScreen ? "8vh" : "15vh",
                  width: isSmallScreen ? "15vh" : "25vh", // Default width
                  // "@media (max-width: 600px)": {
                  //   height: "2vh", // Adjust height for small screens
                  //   width: "20vh", // Adjust width for small screens
                  // },
                }}
              />
            </a> */}
            <Typography variant="h4" >REVIEWER</Typography>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none"}, justifyContent: {  xs: "flex-end", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon sx={{ color: "white", fontWeight: "bold" }} />

            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              PaperProps={{
                sx: { backgroundColor: "transparent", color: "white" },
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  style={{ background: "#2A3055" }}
                  key={page}
                  onClick={handleCloseNavMenu}
                >
                  <Link
                    to={`/${page.toLowerCase().replace(/\s/g, "-")}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Typography
                      textAlign="center"
                      fontFamily="Aktiv"
                      // sx={{ fontFamily: "TrajanPro3Black" }}
                    >
                      {page}
                    </Typography>
                  </Link>
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
                  
                  color: "white",
                  display: "block",
                  fontSize: "1rem",
                  fontWeight: "Bold",
                  padding: "1px 30px",
                  textTransform: 'none',
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
          <Box sx={{marginRight: 4}}>
            <Button sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  fontSize: "1rem",
                  fontWeight: "Bold",
                  ml: "0.5em",
                  textTransform: 'none',

                
                }}
                onMouseEnter={onEnter}
                onMouseLeave={onLeave}
              > Login </Button>
          </Box>

          <Box>
            <Button sx={{
                  color: "#11357C",
                  display: "block",
                  fontSize: "1rem",
                  fontWeight: "Bold",
                  backgroundColor: "#FFCF87",
                  textTransform: 'none',
                                }}
                onMouseEnter={onEnter}
                onMouseLeave={onLeave}
              > Register </Button>
          </Box>
</>)}
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
