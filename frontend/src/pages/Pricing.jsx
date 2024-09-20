import React from "react";
import Pricing from "../pricing/index.jsx";
import ResponsiveAppBar from "../navbar/NavBar.jsx";

const Price = ({ token }) => {
  const text = "hide";
  return (
    <>
      <ResponsiveAppBar token={token} />
      <div >
        <Pricing hide={text}/>
      </div>
    </>
  );
};

export default Price;
