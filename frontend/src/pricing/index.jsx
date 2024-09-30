import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Grid, Typography, Container } from "@mui/material";
import { Check } from "@mui/icons-material";
import Cards from "./Cards";
import { apiGet, apiPost } from "../utils/axios";

export default function Pricing({ hide, token }) {
  const freeFeatures = [
    { icon: <Check />, text: "Single paper review" },
    { icon: <Check />, text: "No subscription needed" },
    { icon: <Check />, text: "Buy more as you need" },
  ];

  const basicFeatures = [
    { icon: <Check />, text: "10 paper review" },
    { icon: <Check />, text: "No subscription Needed" },
    { icon: <Check />, text: "Buy more as you need" },
  ];

  const proFeatures = [
    { icon: <Check />, text: "Unlimited paper review" },
    { icon: <Check />, text: "Subscription needed" },
    { icon: <Check />, text: "One time payment" },
  ];

  const [chargeData, setChargeData] = useState(null);
  const chardid = "chg_TS01A0920241419Dp840708828";
  // const params = new URLSearchParams(location.search);
  // const tapId = params.get("tap_id");
  // console.log("[tapId]", tapId);

  // useEffect(() => {
  //   const fetchChargeDetails = async () => {
  //     try {
  //       const response = await apiGet(`payment/getCharge/${tapId}`);
  //       setChargeData(response.data);
  //       console.log(response)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   };

  //   fetchChargeDetails();
  // }, []);

  return (
    <>
      <Container maxWidth={false}>
        <Grid container mt={{ xs: 3, sm: 8 }} spacing={2} mb={12} display="flex"
            justifyContent="center">
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="center"
            color="black"
          >
            {/* {hide === "hide" ? null : (
              <Typography sx={{color:"#2997f7"}} variant="h5">PRICING</Typography>
            )} */}
          </Grid>
          {/* <Grid
            item
            xs={12}
            display="flex"
            justifyContent="center"
            color="white"
          >
            <div>
          <h1>Pay with BenefitPay</h1>
          <div id="card-sdk-id" ref={cardSdkRef}></div>
          <div>
          <button onClick={handlePaymentSubmission} disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Payment'}
          </button>
          </div> */}
          {/* <BenefitPayButton
            amount="1000" // Amount in smallest currency unit (e.g., 1000 fils = 1 BHD)
            currency="BHD" // Currency code
            paymentIntentId="your_payment_intent_id" // The payment intent ID from your server
            operator={{
              publicKey: 'pk_test_ToQX5dtK83AiZNfjHu0kRmL9'
            }}
            onSuccess={handlePaymentSuccess}
            onFailure={handlePaymentFailure}
          /> */}
          {/* </div> */}
          {/* </Grid> */}
          <Grid
            item
            gap={2}
            xs={12}
            color="white"
          >
            <Typography className="animate-character4" variant="h3">
              The Right Plan for You
            </Typography>
          </Grid>
          <Cards
            title="Pay as you go"
            backgroundColor="linear-gradient(to right, #2997f7, #012a61)" // Dark Blue to Sky Blue gradient
            textColor="#fafafa" // Light Gray text color for better contrast
            price="$ 4.9 / Paper"
            features={freeFeatures}
            buttonText="Pay"
            titleText="Paper/Thesis Review"
            ChipColor="linear-gradient(to right, #012a61, #2997f7)" // Sky Blue to Light Gray gradient for the chip
            ChipTextColor="#FAFAFA" // Dark Blue text color for better contrast
            amount={4.9}
            token={token}
          />

          {/* <Cards
            title="Buy in bulk"
            backgroundColor="linear-gradient(to right, #2997f7, #012a61)" // Sky Blue to Light Gray gradient
            textColor="#fafafa" // Dark Blue text color
            price="$27 / 10 papers"
            features={basicFeatures}
            buttonText="Pay"
            titleText="Enhanced Document Review By AI"
            ChipColor="linear-gradient(to right, #012a61, #2997f7)" // Dark Blue to Sky Blue gradient for the chip
            ChipTextColor="#fafafa" // Light Gray text color
            amount={27}
            token={token}
          />

          <Cards
            title="Annual plan"
            backgroundColor="linear-gradient(to right, #012a61, #2997f7)" // Dark Blue to Light Gray gradient
            textColor="#fafafa" // Sky Blue text color for contrast
            price="$97 / year"
            features={proFeatures}
            buttonText="Pay"
            titleText="Premium Document Review By AI"
            ChipColor="linear-gradient(to right, #2997f7, #012a61)" // Sky Blue to Dark Blue gradient for the chip
            ChipTextColor="#fafafa" // Light Gray text color
            amount={97}
            token={token}
          /> */}
        </Grid>
      </Container>
    </>
  );
}

{
  /* <Grid item xs={12} sm={4}>
            <Cards
              title="Pay as you go"
              backgroundColor="linear-gradient(to right, #cbbaa8, #e9e9e9)" // Nude to Pewter gradient
              textColor="#212223" // Charcoal text color
              price="$6 / paper"
              features={freeFeatures}
              buttonText="Pay"
              titleText="Basic Document Review By AI"
              ChipColor="transparent"
              ChipTextColor="black"
              amount={6}
            />
          </Grid> */
}

// {/* Buy in bulk card */}
// <Grid item xs={12} sm={4}>
//   <Cards
//     title="Buy in bulk"
//     backgroundColor="linear-gradient(to right, #e9e9e9, #bc9d6e)" // Pewter to Tan gradient
//     textColor="#212223" // Charcoal text color
//     price="$27 / 10 papers"
//     features={basicFeatures}
//     buttonText="Pay"
//     titleText="Enhanced Document Review By AI"
//     ChipColor="linear-gradient(to right, #008080,#3b6544)" // A strong contrast gradient for the chip
//     ChipTextColor="white"
//     amount={27}
//   />
// </Grid>

// {/* Annual plan card */}
// <Grid item xs={12} sm={4}>
//   <Cards
//     title="Annual plan"
//     backgroundColor="linear-gradient(to right, #bc9d6e, #212223)" // Tan to Charcoal gradient
//     textColor="#e9e9e9" // Pewter text color for better contrast
//     price="$97 / year"
//     features={proFeatures}
//     buttonText="Pay"
//     titleText="Premium Document Review By AI"
//     ChipColor="linear-gradient(to right, #110f25,#2A3055 )" // Dark, strong contrast gradient for the chip
//     ChipTextColor="white"
//     amount={97}
//   />
// </Grid>
