import { Link as RouterLink } from "react-router-dom";
// @mui
import { Stack, LinearProgress, Box } from "@mui/material";
import logo from "../assets/REV.png";

// import { Zoom } from 'react-awesome-reveal';

export default function LazyLoader() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <RouterLink to="/">
        <Stack direction="column" spacing={2}>
          {/* <Zoom center cascade> */}
          <img
            src={logo}
            alt="Main Logo"
            loading="lazy"
            height={200}
            width={200}
          />
          {/* </Zoom> */}
          {/* <Bounce cascade>
          <img src='/static/logo/ppd.svg' alt="PPD" style={{ marginTop: 20 }} />
        </Bounce> */}
          <Box sx={{ width: "100%" }}>
            <LinearProgress
              sx={{
                backgroundColor: "#6E263D",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#BD9A5F",
                },
              }}
            />
          </Box>
        </Stack>
      </RouterLink>
    </div>
  );
}
