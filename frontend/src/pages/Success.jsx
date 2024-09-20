import React, { useEffect, useState } from "react";
import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { apiGet, apiPost } from "../utils/axios";

const Success = ({ user }) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const queryParams = new URLSearchParams(location.search);
  const payment_intent = queryParams.get("payment_intent");
  const payment_intent_client_secret = queryParams.get(
    "payment_intent_client_secret"
  );
  const redirect_status = queryParams.get("redirect_status");

  console.log("payment_intent", payment_intent);
  console.log("payment_intent_client_secret", payment_intent_client_secret);
  console.log("redirect_status", redirect_status);

  const checkPaymentStatus = async () => {
    try {
      const res = await apiGet(
        `payment/getTransactionByEmail?email=${user?.email}`
      );
      console.log("statusoftransation", res.transactions);
      setStatus(res?.transactions);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  };
  useEffect(() => {
    checkPaymentStatus();
  }, []);
  console.log('status,',status.length)
  const handlePayment = async () => {
    const transactionData = {
      email: user?.email, // You should replace this with actual user email
      amount: 4.9,
      status: redirect_status,
      paymentIntentId: payment_intent,
      currency: 'usd'
    };

    // Save transaction data to the server
    try {
      const res = await apiPost(`payment/transaction`, {
        transactions: [transactionData],
      });
      console.log("Transaction saved successfully", res);
    } catch (err) {
      console.error("Error saving transaction:", err);
    }
  };
 
  return (
    <Container>
      <Grid container mt={10}>
        <Grid item sx={12} bgcolor={"white"} borderRadius={"25px !important"}>
          <Stack direction={"column"} alignItems={"center"} p={5}>
            <CheckCircleIcon sx={{ color: "green", fontSize: 100 }} />
            <Typography mt={3} mb={1} variant='h4'>
              {" "}
              Payment Successful!{" "}
            </Typography>
            <Button
              sx={{
                mt: 4,
                borderRadius: "30px",
                background: "linear-gradient(153deg, #012a61 0%, #2997f7 50%)",
              }}
              variant='contained'
              onClick={() => navigate("/review-document")}
            >
              Lets Review
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Success;
