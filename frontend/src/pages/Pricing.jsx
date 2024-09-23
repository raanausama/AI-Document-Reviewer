import React from "react";
import Pricing from "../pricing/index.jsx";
import ResponsiveAppBar from "../navbar/NavBar.jsx";
import { Container } from "@mui/material";

const Price = ({ token }) => {
  const text = "hide";
  return (
    <>
      <ResponsiveAppBar token={token} />
      <div>
        <Pricing hide={text} token={token} />
      </div>
    </>
  );
};

export default Price;
