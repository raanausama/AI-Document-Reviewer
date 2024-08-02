import React from "react";
import {
  Grid,
  Paper,
  Typography,
  CardContent,
  Card,
  CardActions,
  Button,
  Stack,
  Chip,
  List,
  ListItem,
  Divider,
  Container,
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { Check, KeyboardArrowRight } from "@mui/icons-material";
import Cards from "./Cards";

export default function Pricing({hide}) {
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
  return (
    <>
      <Container maxWidth={false}>
        <Grid container mt={15} spacing={2} mb={10}>
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="center"
            color="white"
          >
            {hide === 'hide' ? null : <Typography variant="h5">PRICING</Typography>}
          </Grid>
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="center"
            color="white"
          >
            <Typography className="animate-character" variant="h3">Chose the Right Plan for You</Typography>
          </Grid>
          <Cards
            title="Pay as you go"
            backgroundColor="white"
            textColor="black"
            price="$6 / paper"
            features={freeFeatures}
            buttonText="Pay"
            titleText="Basic Document Review By AI"
            ChipColor="transparent"
            ChipTextColor="black"
          />
          <Cards
            title="Buy in bulk"
            backgroundColor="linear-gradient(to right, #c0c0c0,#939897 )"
            textColor="black"
            price="$27 / 10 papers"
            features={basicFeatures}
            buttonText="Pay"
            titleText="Enhanced Document Review By AI"
            ChipColor="linear-gradient(to right, #008080,#3b6544)"
            ChipTextColor="white"
          />
          <Cards
            title="Annual plan"
            backgroundColor="linear-gradient(to right, #E79A3F, #C8B575)"
            textColor="black"
            price="$97 / year"
            features={proFeatures}
            buttonText="Pay"
            titleText="Premium Document Review By AI"
            ChipColor="linear-gradient(to right, #110f25,#2A3055 )"
            ChipTextColor="white"
          />
        </Grid>
      </Container>
    </>
  );
}
