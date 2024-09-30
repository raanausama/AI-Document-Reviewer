import React, { useState, useEffect } from 'react';
import { Box, Divider } from '@mui/material';
import ResponsiveAppBar from '../navbar/NavBar';
import Homepage from '../pages/Homepage';
import KeyFeatures from '../features';
import Pricing from '../pricing';
import LearnMore from '../learnmore';
import CommonQuestions from '../questions';
import Reviewer from '../pages/Reviewer';
import Footer from '../pages/Footer';
import LazyLoader from '../components/LazyLoader.jsx'; 
import SlideInComponent from './../components/SlideInComponent.jsx';

const Home = ({ token }) => {
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 2000); 

  //   return () => clearTimeout(timer);
  // }, []);

  // if (loading) {
  //   return <LazyLoader />;
  // }

  return (
    <>
      <ResponsiveAppBar token={token} />

      <SlideInComponent><Homepage token={token} /></SlideInComponent>

      <Divider sx={{ height: '0.001px', background: 'rgb(171,154,154)', width: '100%' }} />

      <SlideInComponent><KeyFeatures /></SlideInComponent>

      <Divider sx={{ height: '0.001px', background: 'rgb(171,154,154)', width: '100%' }} />

      <SlideInComponent><Pricing /></SlideInComponent>

      <Divider sx={{ height: '0.001px', background: 'rgb(171,154,154)', width: '100%' }} />

      <SlideInComponent><LearnMore /></SlideInComponent>

      <SlideInComponent><CommonQuestions /></SlideInComponent>

      {/* <Reviewer token={token} /> */}

      <Divider sx={{ height: '0.001px', background: 'rgb(171,154,154)', width: '100%', marginTop: 10 }} />

      <Footer />


    </>
  );
};

export default Home;
