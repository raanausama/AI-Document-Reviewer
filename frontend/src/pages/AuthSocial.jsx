// material
import { Button, Divider, Stack, Typography } from '@mui/material';
// import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import Iconify from '../components/Iconify';
import { signInWithGoogle } from '../utils/firebase';

export default function AuthSocial({ navigate, dispatch }) {
  return (
    <>
      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'white' }}>
          OR
        </Typography>
      </Divider>
      <Stack direction="column" spacing={1} sx={{marginBottom:'20px !important',margintop:'1px !important'}}>
        <Button variant="contained"  sx={{ textTransform: "none",bgcolor:'white' }} fullWidth onClick={() => { signInWithGoogle(navigate, dispatch) }} size="large" color="inherit" startIcon={<Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />} >
          Login with Google
        </Button>
        {/* <Button sx={{ textTransform: "none" }} fullWidth size="large" color="inherit" startIcon={<Iconify icon="eva:facebook-fill" color="primary" width={22} height={22} />}>
          Login with Singpass
        </Button> */}
      </Stack>
    </>
  );
}
