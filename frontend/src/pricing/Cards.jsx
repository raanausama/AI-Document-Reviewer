import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  Divider,
  CardActions,
  Button,
  Stack,
} from "@mui/material";
import { KeyboardArrowRight } from "@mui/icons-material";
import { apiPost } from "../utils/axios";
import { useNavigate } from "react-router-dom";

const Cards = ({
  title,
  titleText,
  backgroundColor,
  textColor,
  price,
  features,
  buttonText,
  ChipColor,
  ChipTextColor,
  amount,
  token
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handlePaymentSubmission = async () => {
    setIsSubmitting(true);

    

    const requestData = {
      // token: token, // This should be a simple string
      amount: amount,
      currency: "SAR",
      customer: {
        first_name: "test",
        middle_name: "test",
        last_name: "test",
        email: "test@test.com",
        phone: {
          country_code: "965",
          number: "51234567",
        },
      },
    };

    // Ensure requestData does not include circular or non-serializable objects
    console.log("Request data:", requestData);

    try {
      const res = await apiPost("payment", requestData);
      console.log("Response:", res);
      const paymentUrl = res.transaction.url;

      // Redirect the user to the payment page
      window.location.href = paymentUrl;
    } catch (error) {
      console.error("Payment submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Grid item xs={12} md={6} color='black'>
      <Card
        sx={{
          minWidth: 275,
          background: backgroundColor,
          color: textColor,
          borderRadius: "20px",
        }}
      >
        <CardContent>
          <Grid container>
            <Grid item xs={12}>
              <Stack textAlign='Left'>
                <Typography
                  level='h1'
                  sx={{
                    padding: "4px 8px",
                    borderRadius: "16px",
                    background: ChipColor,
                    color: ChipTextColor,
                    fontWeight: "bold",
                  }}
                  mb={1}
                >
                  {title}
                </Typography>
                <Typography level='h3' mb={2}>
                  {titleText}
                </Typography>
                <Divider inset='none' mt={2} color='black' />
                <List
                  size='sm'
                  sx={{ mx: "calc(-1 * var(--ListItem-paddingX))" }}
                >
                  {features.map((feature, index) => (
                    <ListItem key={index}>
                      {feature.icon}
                      {feature.text}
                    </ListItem>
                  ))}
                </List>
                <Divider inset='none' color='black' />
                <CardActions>
                  <Typography level='title-lg' sx={{ mr: "auto" }}>
                    {price}
                  </Typography>
                  <Button
                    variant={ChipColor === "transparent" ? "soft" : "contained"}
                    endIcon={<KeyboardArrowRight />}
                    sx={{
                      color: ChipTextColor === "white" ? "white" : "neutral",
                      background: ChipColor === "transparent" ? "" : ChipColor,
                    }}
                    disabled={isSubmitting}
                    onClick={() => {token ? navigate("/payout") : navigate("/login")}}
                  >
                    {isSubmitting ? "Progress..." : "Pay now"}
                  </Button>
                </CardActions>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Cards;
