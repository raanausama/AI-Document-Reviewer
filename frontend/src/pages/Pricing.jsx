import React from 'react'
import Pricing from '../pricing/index.jsx'
import ResponsiveAppBar from '../navbar/NavBar.jsx';

const Price = () => {
    const text = 'hide';
  return (
    <>
    <ResponsiveAppBar/>
    <Pricing hide={text}/>
    </>
  )
}

export default Price;