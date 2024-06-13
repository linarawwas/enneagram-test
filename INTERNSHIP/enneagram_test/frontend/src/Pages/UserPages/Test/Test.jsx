import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions } from "../../../features/questions/questionsApi";
import {
  Container,
  CssBaseline,
  Tabs,
  Tab,
  Box,
  Typography,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Radio,
  Stack,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { a11yProps } from "../../../utils.ts"; // Importing utility functions
import ButtonAppBar from "../../../components/UserComponents/ButtonAppBar.tsx"; // Importing custom ButtonAppBar component
import QuestionCard from "../../../components/UserComponents/QuestionCard.tsx"; // Importing custom QuestionCard component
import { postAnswers } from "../../../features/answers/answersApi";
import { ToastContainer } from "react-toastify";
import { clearMe } from "../../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

// Define the Test component
const Test = () => {
  const dispatch = useDispatch(); // Access Redux dispatch function
  const questions = useSelector((state) => state.questions.questions); // Access questions state from Redux store
  const totalPages = Math.ceil(questions.length / 1); // Calculate total pages based on the number of questions (assuming 1 question per page)
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1); // State variable for current page, initialized to 1
  const [value, setValue] = useState(1); // State variable for tab value, initialized to 1
  const [selectedValues, setSelectedValues] = useState({}); // State variable to store selected values for each question
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false); // State variable to track if all questions are answered, initialized to false
  const [showThankYou, setShowThankYou] = useState(false); // State variable to show/hide thank you message, initialized to false
  const [answers, setAnswers] = useState([]); // State variable to store user answers, initialized as an empty array
  const userId = useSelector((state) => state.auth.me.id); // Accessing the correct state path

  // Effect hook to fetch questions when component mounts
  useEffect(() => {
    dispatch(fetchQuestions()); // Dispatch action to fetch questions
  }, [dispatch]); // Dependencies array to ensure effect runs only once

  // Effect hook to update value and allQuestionsAnswered state when currentPage or totalPages change
  useEffect(() => {
    setValue(currentPage - 1); // Update tab value based on current page
    if (answers.length === questions.length) {
      setAllQuestionsAnswered(!allQuestionsAnswered); // Set allQuestionsAnswered to true if currentPage exceeds totalPages
    } else {
      setAllQuestionsAnswered(false); // Reset allQuestionsAnswered to false otherwise
    }
  }, [answers.length, currentPage, questions.length]); // Dependencies array to trigger effect on currentPage or totalPages change

  // Handler function to change the active tab in the pagination
  const handleChangeTab = (event, newValue) => {
    setValue(newValue); // Update the value state with the new tab index
    setCurrentPage(newValue + 1); // Update the currentPage state with the corresponding page number
  };

  // Handler function to change the answer for a question
  const handleAnswerChange = (questionId, grade) => {
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      const index = newAnswers.findIndex((answer) => answer.questionId === questionId);

      if (index !== -1) {
        newAnswers[index].grade = grade;
      } else {
        newAnswers.push({ questionId, grade });
      }
      return newAnswers;
    });

    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [questionId]: grade.toString(),
    }));
    if (answers.length === questions.length) {
      setAllQuestionsAnswered(true);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  const controlProps = (item, questionId) => ({
    checked: selectedValues[questionId] === item,
    onChange: (event) => {
      const grade = parseInt(event.target.value, 10);
      handleAnswerChange(questionId, grade);
    },
    value: item,
    name: `size-radio-button-demo-${questionId}`,
    inputProps: { "aria-label": item },
  });
  const handleSubmitResult = () => {
    setShowThankYou(true);
    const payload = {
      userId,
      answers,
    };
    dispatch(postAnswers(payload)); // Dispatch the thunk action with payload
  };

  return (
    <>
      <ToastContainer />
      <ButtonAppBar />
      <CssBaseline />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        {allQuestionsAnswered && (
          <Card>
            <CardActionArea
              sx={{ width: "fit-content", height: "60vh", marginTop: "1" }}
            >
              <CardContent>
                {!showThankYou && (
                  <Typography variant="h3" gutterBottom>
                    Congrats! You have answered all questions. <br />
                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{ py: 5, justifyContent: "center" }}
                    >
                      <Button
                        variant="outlined"
                        startIcon={<ExitToAppIcon color="#1976d2" />}
                        onClick={() => {
                          dispatch(clearMe());
                          navigate("/login");
                        }}
                      >
                        Quit
                      </Button>
                      <Button
                        variant="contained"
                        endIcon={<SendIcon />}
                        onClick={() => handleSubmitResult()}
                      >
                        Send
                      </Button>
                    </Stack>
                  </Typography>
                )}
                {showThankYou && (
                  <Typography variant="h4" gutterBottom>
                    Thank you for taking our enneagram test. <br />
                    We hope you had a wonderful experience.
                  </Typography>
                )}
              </CardContent>
            </CardActionArea>
          </Card>
        )}
        {!allQuestionsAnswered &&
          questions
            .slice((currentPage - 1) * 1, currentPage * 1)
            .map((question) => (
              <QuestionCard
                key={question.id}
                question={question}
                currentPage={currentPage}
                controlProps={(item) => controlProps(item, question.id)}
              />
            ))}
      </Container>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          position: "fixed",
          bottom: 1,
          width: "100%",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChangeTab}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons="auto"
        >
          {Array.from({ length: totalPages }, (_, index) => (
            <Tab key={index} label={`${index + 1}`} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Box>
    </>
  );
};

export default Test;
