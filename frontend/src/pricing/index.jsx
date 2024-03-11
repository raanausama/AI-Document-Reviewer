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

export default function Pricing() {
  const freeFeatures = [
    { icon: <Check />, text: "AI-powered document review" },
    { icon: <Check />, text: "Limited number of documents per month" },
    { icon: <Check />, text: "Basic formatting suggestions" },
    { icon: <Check />, text: "Email support" },
  ];

  const basicFeatures = [
    { icon: <Check />, text: "All features of FREE plan" },
    { icon: <Check />, text: "AI-powered documents with more accuracy" },
    { icon: <Check />, text: "Priority ammain support" },
    { icon: <Check />, text: "Increased number of documents per month" },
  ];

  const proFeatures = [
    { icon: <Check />, text: "All features of FREE plan" },
    { icon: <Check />, text: "AI-powered documents with more accuracy" },
    { icon: <Check />, text: "Priority ammain support" },
    { icon: <Check />, text: "Increased number of documents per month" },
  ];
  return (
    <>
      <Container maxWidth={false}>
        <Grid container mt={10} spacing={2} mb={10}>
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="center"
            color="white"
          >
            <Typography variant="h5">PRICING</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="center"
            color="white"
          >
            <Typography variant="h3">Chose the Right Plan for You</Typography>
          </Grid>
          <Cards
            title="FREE"
            backgroundColor="white"
            textColor="black"
            price="0€ / month"
            features={freeFeatures}
            buttonText="Continue with FREE"
            titleText="Basic Document Review By AI"
            ChipColor="transparent"
            ChipTextColor="black"
          />
          <Cards
            title="BASIC"
            backgroundColor="linear-gradient(to right, #c0c0c0,#939897 )"
            textColor="black"
            price="29€ / month"
            features={basicFeatures}
            buttonText="Try the Basic plan"
            titleText="Enhanced Document Review By AI"
            ChipColor="linear-gradient(to right, #32a94c,#46cd64 )"
            ChipTextColor="white"
          />
          <Cards
            title="PRO"
            backgroundColor="linear-gradient(to right, #E79A3F, #C8B575)"
            textColor="black"
            price="50€ / month"
            features={proFeatures}
            buttonText="Try the PRO plan"
            titleText="Premium Document Review By AI"
            ChipColor="linear-gradient(to right, #110f25,#2A3055 )"
            ChipTextColor="white"
          />
        </Grid>
      </Container>
    </>
  );
}
