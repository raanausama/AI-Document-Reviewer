// import React, { useEffect } from 'react';
// import { Box, CircularProgress, LinearProgress, Typography } from '@mui/material';
// import './../index.css'
 

// // const headerStyle = {
// //   fontFamily: 'Cinzel, serif',
// //   fontWeight: 'bold',
// //   fontSize: '4rem',
// //   background: 'linear-gradient(153deg, rgba(51,49,43,1) 0%, rgba(168,123,76) 50%)',
// //   WebkitBackgroundClip: 'text',
// //   WebkitTextFillColor: 'transparent',
// //   textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
// //   animation: 'fadeInLeft 2s ease-in-out',
// // };

// // // Define the keyframes
// // const fadeInLeftKeyframes = `
// //   @keyframes fadeInLeft {
// //     0% {
// //       opacity: 0;
// //       transform: translateX(-100%);
// //     }
// //     100% {
// //       opacity: 1;
// //       transform: translateX(0);
// //     }
// //   }
// // `;

// const LazyLoader = () => {
// //   useEffect(() => {
// //     // Inject the keyframes into the document's stylesheet
// //     const styleSheet = document.styleSheets[0];
// //     styleSheet.insertRule(fadeInLeftKeyframes, styleSheet.cssRules.length);
// //   }, []);

//   return (
//     <Box
//       sx={{
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         width: '100%',
//         height: '100%',
//         backgroundColor: 'white',
//         zIndex: 1300,
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         flexDirection: 'column',
//       }}
//     >
//       <Typography
//                 className="animate-character3"
//                 variant="h2"
//                 sx={{
//                   fontSize: {
//                     xs: "1.4rem",
//                     sm: "1.5rem",
//                     md: "2.5rem",
//                     lg: "3.5rem",
//                   },
//                   fontWeight: "bold",
//                   marginBottom: "1rem",
//                 }}
//               >
//                 ReviewIT
//               </Typography>
//       <LinearProgress color="inherit" sx={{ color: '#cbbaa8', width: '10%' }} />
//     </Box>
//   );
// };

// export default LazyLoader;

import React from 'react';
import { Box, LinearProgress } from '@mui/material';
import './../index.css';
import logo from "./../assets/animatelogogif.gif"

const LazyLoader = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        zIndex: 1300,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <img
        src={logo}
        alt="Loading Logo"
        style={{ width: '300px', height: '300px' }} // Adjust size as needed
      />
      {/* <LinearProgress color="inherit" sx={{ color: '#cbbaa8', width: '20%' }} /> */}
    </Box>
  );
};

export default LazyLoader;
