import React, { useState } from 'react';
import { Typography, Grid, Container, Stack, IconButton, Collapse } from "@mui/material";
import { Add, Close } from "@mui/icons-material";

function CommonQuestions({ repo }) {
  const [openQuestions, setOpenQuestions] = useState({});

  const toggleQuestion = (index) => {
    setOpenQuestions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const questions = [
    {
      question: "How secure is my paper/manuscript?",
      answer: "Your paper/manuscript will never leave our servers. We prioritize the security and privacy of your data over everything else.",
    },
    {
      question: "What AI models does ReviewIT use?",
      answer: "We use a variety of AI and generative AI models. However, rest assured, we do not use customers' data to train or retrain our AI models.",
    },
    {
      question: "Why is there no free trial?",
      answer: "Financial gain is not the primary objective behind developing this tool. We developed this tool to help researchers, especially PhD students, evaluate the quality of their papers. Charging a nominal fee helps us to run our services.",
    },
    {
      question: "How to contact the team behind ReviewIT?",
      answer: "You can contact us by sending an email to customersupport@zaytrics.com.",
    },
  ];

  return (
    <>
      <Container
        maxWidth={false}
        sx={{ mt: repo === 'faqs' ? 15 : 3, display: "flex", justifyContent: "center", mb: repo === 'faqs' ? 15 : 3 }}
      >
        <Grid
          container
          sx={{
            background: 'linear-gradient(to right, #012a61, #2997f7)', // Dark Blue to Sky Blue gradient for container background
            color: '#fafafa', // Light Gray text color for contrast
            borderRadius: '15px',
            padding: 4, // Increased padding for better spacing
            maxWidth: '900px', // Set a fixed maxWidth for consistency
            width: '100%', // Ensures it adapts to screen size but doesn't exceed maxWidth
          }}
        >
          <Grid item xs={12} md={4} mb={{ xs: 0, md: 20 }} mt={5}>
            <Stack textAlign='left'>
              <Typography
                variant='body2'
                sx={{ color: '#2997f7' }} // Sky Blue color for the 'FAQ' label
              >
                FAQ
              </Typography>
              <Typography
                variant='h4'
                fontWeight='bold'
                sx={{ color: '#fafafa' }} // Light Gray color for the heading
              >
                Common Questions
              </Typography>
              <Typography
                variant='body2'
                sx={{ color: '#2997f7' }} // Sky Blue color for the description
              >
                Here are some common questions users ask frequently.
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={8} mt={{ xs: 5, md: 5 }}>
            <Stack textAlign='left'>
              {questions.map((item, index) => (
                <div key={index}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between" mt={2}>
                    <Typography
                      variant='h5'
                      fontWeight='bold'
                      sx={{ color: '#fafafa', cursor: 'pointer' }} // Light Gray color for the question headings
                      onClick={() => toggleQuestion(index)}
                    >
                      {item.question}
                    </Typography>
                    <IconButton
                      sx={{ color: '#FAFAFA' }} // Sky Blue color for the icon
                      onClick={() => toggleQuestion(index)}
                    >
                      {openQuestions[index] ? <Close /> : <Add />}
                    </IconButton>
                  </Stack>
                  <Collapse in={openQuestions[index]} timeout="auto" unmountOnExit>
                    <Typography
                      variant='body1'
                      mt={2}
                      sx={{ color: '#fafafa', transition: 'all 0.3s ease' }} // Light Gray color for the answers
                    >
                      {item.answer}
                    </Typography>
                  </Collapse>
                </div>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default CommonQuestions;
