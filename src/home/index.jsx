
import { Box, Divider } from '@mui/material';
import ResponsiveAppBar from '../navbar/NavBar';
import Homepage from '../pages/Homepage';
import KeyFeatures from '../features';
import Pricing from '../pricing';
import LearnMore from '../learnmore';
import CommonQuestions from '../questions';
import Reviewer from '../pages/Reviewer';
import Footer from '../pages/Footer';

const Home=()=> {
  return (
    <>
        <ResponsiveAppBar />

        <Homepage/>

        <Divider sx={{ height: '0.001px',background: 'rgb(171,154,154)',width: '100%',}}/>


        <KeyFeatures/>

        <Divider sx={{ height: '0.001px',background: 'rgb(171,154,154)',width: '100%',}}/>

        <Pricing/>

        <Divider sx={{ height: '0.001px',background: 'rgb(171,154,154)',width: '100%',}}/>

        <LearnMore/>

        <Divider sx={{ height: '0.001px',background: 'rgb(171,154,154)',width: '100%',}}/>

        <CommonQuestions/>

        <Reviewer/>

        <Divider sx={{ height: '0.001px',background: 'rgb(171,154,154)',width: '100%',}}/>

        <Footer/>

    </>
  );
}

export default Home