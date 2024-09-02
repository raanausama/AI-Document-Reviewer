import React from "react";
import {
  Grid,
  Typography,
  CardContent,
  Card,
  Stack,
  Container,
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

export default function KeyFeatures() {
  return (
    <Container maxWidth={false} sx={{  padding: "40px 0", mt: 10 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} display="flex" justifyContent="center">
          <Typography variant="h5" color="Black">
            FEATURES
          </Typography>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="center">
          <Typography variant="h3" color="#bc9d6e" className="animate-character">
            Key Features
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: "#cbbaa8", color: "#212223", borderRadius: 2, boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
            <CardContent>
              <Grid container>
                <Grid item xs={2}>
                  <AutoAwesomeIcon sx={{ color: "#bc9d6e", fontSize: 40 }} />
                </Grid>
                <Grid item xs={10}>
                  <Stack textAlign="left">
                    <Typography variant="h6" gutterBottom>
                    Identify Strengths and Weaknesses
                    </Typography>
                    <Typography variant="body1">
                    ReviewIT thoroughly analyzes your research paper, helping you pinpoint specific strengths and weaknesses, ensuring your paper is well-prepared for submission.                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: "#cbbaa8", color: "#212223", borderRadius: 2, boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
            <CardContent>
              <Grid container>
                <Grid item xs={2}>
                  <AutoAwesomeIcon sx={{ color: "#bc9d6e", fontSize: 40 }} />
                </Grid>
                <Grid item xs={10}>
                  <Stack textAlign="left">
                    <Typography variant="h6" gutterBottom>
                    Increase Acceptance Chances
                    </Typography>
                    <Typography variant="body1">
                    With ReviewIT, your paper undergoes a meticulous review process that significantly increases its chances of acceptance by academic journals and conferences.
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: "#cbbaa8", color: "#212223", borderRadius: 2, boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
            <CardContent>
              <Grid container>
                <Grid item xs={2}>
                  <AutoAwesomeIcon sx={{ color: "#bc9d6e", fontSize: 40 }} />
                </Grid>
                <Grid item xs={10}>
                  <Stack textAlign="left">
                    <Typography variant="h6" gutterBottom>
                    Quick Review Generation
                    </Typography>
                    <Typography variant="body1">
                    Time is of the essence. ReviewIT generates a detailed review of your paper in just 30 seconds, allowing you to quickly implement feedback and move forward in the submission process.
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: "#cbbaa8", color: "#212223", borderRadius: 2, boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
            <CardContent>
              <Grid container>
                <Grid item xs={2}>
                  <AutoAwesomeIcon sx={{ color: "#bc9d6e", fontSize: 40 }} />
                </Grid>
                <Grid item xs={10}>
                  <Stack textAlign="left">
                    <Typography variant="h6" gutterBottom>
                    Data Security
                    </Typography>
                    <Typography variant="body1">
                    Your research is valuable, and ReviewIT guarantees that all your data remains secure and confidential, giving you peace of mind throughout the review process.                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Container>
  );
}
