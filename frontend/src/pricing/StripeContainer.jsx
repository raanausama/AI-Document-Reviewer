import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CircularProgress } from "@mui/material";
import { apiGet } from "../utils/axios";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(
  `${import.meta.env.VITE_APP_STRIPE_TESTPK}`
);


export default function StripeContainer() {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState({});

  useEffect(() => {
    getSecret();
  }, []);
  // console.log('details',sumAssured,name,email);
  const getSecret = async () => {
    const res = await apiGet(
      `payment?amount=${490}&currency=${"usd"}&customer=${"usama"}`
    );
    // console.log('pesa',sumAssured);
    const options = {
      clientSecret: res.client_secret,
    };
    setOptions(options);
    setLoading(true);
  };

  console.log('options',options);
  //   'sk_test_51LdA73LNFqeI8hC3GrQgjOj9cXKelPWcLZCeXWPcG1zTbc00HMpoUFN45hPSPvVWNf9ICn2e3F7zd9xAp9m2srHg00foJz0I8B'
  return (
    <>
      {options?.clientSecret ? (
        <Elements stripe={stripePromise} options={options}>
          <PaymentForm options={options} />
        </Elements>
      ) : (
        <CircularProgress />
      )}
    </>
  );
}
