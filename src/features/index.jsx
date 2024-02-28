import React from 'react';
import { Grid, Paper, Typography, CardContent,Card, CardActions, Button, Stack } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export default function KeyFeatures() {
  return (
    <>
    <Grid container mt={10} spacing={2} mb={10}>
    <Grid item xs={12} display='flex' justifyContent='center' color='white'>
        <Typography variant='h5'>Features</Typography>
        </Grid>
        <Grid item xs={12} display='flex' justifyContent='center' color='white'>
            <Typography variant='h3'>Key Features</Typography>
        </Grid>
        <Grid item xs={12} md={6} color='white'>
            <Card sx={{ minWidth: 275, background: '#A7BEF2' }}>
                <CardContent>
                <Grid container mt={2} >
                    <Grid item xs={2} mb={13}>
                        <AutoAwesomeIcon sx={{color:'#ab9a9a'}}/>
                    </Grid>
                    <Grid item xs={10} >
                        <Stack textAlign='Left'>
                        <Typography variant='h6'> LOREM IPSUM</Typography>
                        <Typography variant='body1'>Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Typography>
                        </Stack>
                    </Grid>
                    
                </Grid>

                </CardContent>
            </Card>
        </Grid>
        <Grid item xs={12} md={6} color='white'>
            <Card sx={{ minWidth: 275, background: '#A7BEF2' }}>
                <CardContent>
                <Grid container mt={2} >
                    <Grid item xs={2} mb={13}>
                        <AutoAwesomeIcon sx={{color:'#ab9a9a'}}/>
                    </Grid>
                    <Grid item xs={10} >
                        <Stack textAlign='Left'>
                        <Typography variant='h6'> LOREM IPSUM</Typography>
                        <Typography variant='body1'>Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Typography>
                        </Stack>
                    </Grid>
                    
                </Grid>

                </CardContent>
            </Card>
        </Grid>
        <Grid item xs={12} md={6} color='white'>
            <Card sx={{ minWidth: 275, background: '#A7BEF2' }}>
                <CardContent>
                <Grid container mt={2} >
                    <Grid item xs={2} mb={13}>
                        <AutoAwesomeIcon sx={{color:'#ab9a9a'}}/>
                    </Grid>
                    <Grid item xs={10} >
                        <Stack textAlign='Left'>
                        <Typography variant='h6'> LOREM IPSUM</Typography>
                        <Typography variant='body1'>Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Typography>
                        </Stack>
                    </Grid>
                    
                </Grid>

                </CardContent>
            </Card>
        </Grid>
        <Grid item xs={12} md={6} color='white'>
            <Card sx={{ minWidth: 275, background: '#A7BEF2' }}>
                <CardContent>
                <Grid container mt={2} >
                    <Grid item xs={2} mb={13}>
                        <AutoAwesomeIcon sx={{color:'#ab9a9a'}}/>
                    </Grid>
                    <Grid item xs={10} >
                        <Stack textAlign='Left'>
                        <Typography variant='h6'> LOREM IPSUM</Typography>
                        <Typography variant='body1'>Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Typography>
                        </Stack>
                    </Grid>
                    
                </Grid>

                </CardContent>
            </Card>
        </Grid>
    </Grid>
    </>
  )
}
