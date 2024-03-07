import React from "react";
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
}) => {
  return (
    <Grid item xs={12} md={4} color="black">
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
              <Stack textAlign="Left">
                <Typography
                  level="h1"
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
                <Typography level="h3" mb={2}>
                  {titleText}
                </Typography>
                <Divider inset="none" mt={2} color="black" />
                <List
                  size="sm"
                  sx={{ mx: "calc(-1 * var(--ListItem-paddingX))" }}
                >
                  {features.map((feature, index) => (
                    <ListItem key={index}>
                      {feature.icon}
                      {feature.text}
                    </ListItem>
                  ))}
                </List>
                <Divider inset="none" color="black" />
                <CardActions>
                  <Typography level="title-lg" sx={{ mr: "auto" }}>
                    {price}
                  </Typography>
                  <Button
                    variant={ChipColor === "transparent" ? "soft" : "contained"}
                    endIcon={<KeyboardArrowRight />}
                    sx={{
                      color: ChipTextColor === "white" ? "white" : "neutral",
                      background: ChipColor === "transparent" ? "" : ChipColor,
                    }}
                  >
                    {buttonText}
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
