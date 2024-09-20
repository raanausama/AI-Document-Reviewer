import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import {
  PaymentElement,
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
// import { useDispatch } from 'react-redux';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";
import { apiGet, apiPost } from "../utils/axios";
// import { clearUser } from '../../../../redux/user';
// import './payout.css';

const PaymentForm = ({ options }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  //   const [clientSecret, setClientSecret] = useState("");
  const navigate = useNavigate();
  //   const dispatch = useDispatch();

  //   const [errorMessage, setErrorMessage] = useState(null);

  //   const handleLogout = () => {
  //     dispatch(clearUser());
  //     navigate('/login');
  //   };

  //   const handleSubmit = async (event) => {
  //     // We don't want to let default form submission happen here,
  //     // which would refresh the page.
  //     // handleLogout();

  //     event.preventDefault();

  //     if (!stripe || !elements) {
  //       // Stripe.js has not yet loaded.
  //       // Make sure to disable form submission until Stripe.js has loaded.
  //       return;
  //     }

  //     const { error } = await stripe.confirmPayment({
  //       elements,
  //       confirmParams: {
  //         return_url: `${process.env.VITE_APP_APP_CLIENT_URL}/review-document`,
  //       },
  //     });

  //     if (error) {
  //       // This point will only be reached if there is an immediate error when
  //       // confirming the payment. Show error to your customer (for example, payment
  //       // details incomplete)
  //       setErrorMessage(error.message);
  //     } else {
  //       // Your customer will be redirected to your `return_url`. For some payment
  //       // methods like iDEAL, your customer will be redirected to an intermediate
  //       // site first to authorize the payment, then redirected to the `return_url`.
  //       console.log('am in')

  //         submitHandle();
  //       console.log('am here boi')

  //     }
  //   };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      setLoading(false);
      return;
    }

    // Submit the elements form
    const { error: submitError } = await elements.submit();

    if (submitError) {
      console.log("[submitError]", submitError);
      setLoading(false);
      return;
    }
    console.log(`${import.meta.env.VITE_APP_APP_CLIENT_URL}`, "client url");
    // After form is submitted, confirm the payment
    const { error, paymentIntent } = await stripe.confirmPayment({
      clientSecret: options.clientSecret,
      elements,
      confirmParams: {
        return_url: `${import.meta.env.VITE_APP_CLIENT_URL}/success`,
      },
    });

    if (error) {
      console.log("[error]", error);
      setLoading(false);
    } else {
      console.log("[PaymentIntent]", paymentIntent);

      setLoading(false);
    }
  };

  return (
    <form id='payment-form' onSubmit={handleSubmit}>
      <Stack
        // spacing={2}
        sx={{
          padding: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          //   background: "#EAEAEA",
          boxShadow: "0px 4px 4px rgba(0.25, 0.25, 0.25, 0.25)",
          borderRadius: "10px",
        }}
      >
        <PaymentElement id='payment-element' />
        <LoadingButton
          sx={{
            mt: 4,
            borderRadius: "30px",
            background: "linear-gradient(153deg, #012a61 0%, #2997f7 50%)",
          }}
          variant='contained'
          disabled={loading || !stripe}
          fullWidth
          type='submit'
        >
          {loading ? "Loading..." : "Pay now"}
        </LoadingButton>
        {/* {errorMessage && <div>{errorMessage}</div>}  */}

        {/* {errorMessage && <div>{errorMessage}</div>} */}
      </Stack>
    </form>
  );
};
export default PaymentForm;
