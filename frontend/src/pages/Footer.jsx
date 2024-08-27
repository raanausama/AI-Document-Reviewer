// import background from "../assets/background.jpg";
import { FacebookOutlined, Instagram, Twitter } from "@mui/icons-material";
import { Typography, Grid, Container, Button, Stack,  useMediaQuery,useTheme, Link, IconButton } from "@mui/material";

// import Badge from "@mui/material/Badge";

function Footer() {
 
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
    <Container>
      <Grid container mt={3} color={'black'} mb={3} >
        <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'start' }}} >
          <Typography variant="body1" > © Copyright All Rights Reserved</Typography>
        </Grid>
        {/* {!isSmallScreen &&
        <Grid item xs={12} mt={3}>
          <Typography variant="h6"> The most advanced AI Document Reviewer. Experience the revolution now.</Typography>
        </Grid>
        } */}
        <Grid item  xs={12} md={6} sx={{display: 'flex', justifyContent:{xs:'center', md:'flex-end'}, color:'white' }}>
          <Stack  direction='row' spacing={2}>
          <Link
              sx={{ color: "black" }}
            //   href="https://www.facebook.com/MjSkiResort"
              rel="sponsored"
              title="Instagram"
            >
              <IconButton>
                <Instagram sx={{ color: 'black' }}/>
              </IconButton>
            </Link>{" "}
            <Link
              sx={{ color: "black" }}
            //   href="https://twitter.com/Mjskiresort"
              rel="sponsored"
              title="Twitter"
            >
             <IconButton>
                <Twitter sx={{ color: 'black' }}/>
              </IconButton>
            </Link>{" "}
            <Link
              sx={{ color: "black" }}
            //   href="https://www.linkedin.com/company/malam-jabba-ski-resort/?viewAsMember=true"
              rel="sponsored"
              title="Facebook"
            >
              <IconButton>
                <FacebookOutlined sx={{ color: 'black' }}/>
              </IconButton>
            </Link>{" "}
          </Stack>
        </Grid>
       
      </Grid>
      </Container>
      
    </>
  );
}

export default Footer;
