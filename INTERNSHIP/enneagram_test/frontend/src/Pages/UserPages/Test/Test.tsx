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
import { postAnswers } from "../../../features/answers/answersApi.js";
import { ToastContainer } from "react-toastify";
import { clearMe } from "../../../features/auth/authSlice.js";
import { useNavigate } from "react-router-dom";
import { all } from "axios";

// Define the Test component
const Test: React.FC = () => {
  // Redux hooks to access dispatch function and selected state
  const dispatch = useDispatch(); // Access Redux dispatch function
  const questions = useSelector((state: any) => state.questions.questions); // Access questions state from Redux store
  const totalPages = Math.ceil(questions.length / 1); // Calculate total pages based on the number of questions (assuming 1 question per page)
  const navigate = useNavigate();
  // State variables using React hooks
  const [currentPage, setCurrentPage] = useState(1); // State variable for current page, initialized to 1
  const [value, setValue] = useState(1); // State variable for tab value, initialized to 1
  const [selectedValue, setSelectedValue] = useState("a"); // State variable for selected radio button value, initialized to "a"
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false); // State variable to track if all questions are answered, initialized to false
  const [showThankYou, setShowThankYou] = useState(false); // State variable to show/hide thank you message, initialized to false
  const [answers, setAnswers] = useState([]); // State variable to store user answers, initialized as an empty array
  const userId = useSelector((state: any) => state.auth.me.id); // Accessing the correct state path

  // Effect hook to fetch questions when component mounts
  useEffect(() => {
    dispatch(fetchQuestions()); // Dispatch action to fetch questions
  }, [dispatch]); // Dependencies array to ensure effect runs only once

  // Effect hook to update value and allQuestionsAnswered state when currentPage or totalPages change
  useEffect(() => {
    setValue(currentPage - 1); // Update tab value based on current page
    if (answers.length === questions.length) {
      console.log(answers.length);
      console.log(questions.length);
      console.log("show thank you: ", showThankYou);
      console.log(
        "all questions answered? ",
        allQuestionsAnswered,
        "and current page: ",
        currentPage
      );
      setAllQuestionsAnswered(!allQuestionsAnswered); // Set allQuestionsAnswered to true if currentPage exceeds totalPages
      console.log(allQuestionsAnswered);
    } else {
      setAllQuestionsAnswered(false); // Reset allQuestionsAnswered to false otherwise
    }
  }, [answers.length, currentPage, questions.length]); // Dependencies array to trigger effect on currentPage or totalPages change

  // Handler function to change the active tab in the pagination
  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue); // Update the value state with the new tab index
    setCurrentPage(newValue + 1); // Update the currentPage state with the corresponding page number
  };

  // Handler function to change the answer for a question
  const handleAnswerChange = (questionId: string, grade: number) => {
    // Update answers state using callback function
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      const index = newAnswers.findIndex(
        (answer) => answer.questionId === questionId
      );
      if (index !== -1) {
        newAnswers[index].grade = grade;
      } else {
        newAnswers.push({ questionId, grade });
      }
      return newAnswers;
    });
    const result = {
      userId,
      answers: [...answers, { questionId, grade }],
    };
    // Check if the current page is the last page after updating answers
    if (answers.length === questions.length) {
      // Log the final result object with the updated answers
      console.log(
        "current page and questions length: ",
        currentPage,
        " & ",
        questions.length
      );
      console.log(result);
      setAllQuestionsAnswered(true);
    } else {
      // Move to the next page if it's not the last page
      setCurrentPage(currentPage + 1);
      console.log(result);
    }
  };

  // Function to control properties of radio buttons
  const controlProps = (item: string) => ({
    checked: selectedValue === item, // Check if the current radio button is selected
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      const grade = parseInt(event.target.value, 10); // Parse the selected value as an integer
      handleAnswerChange(questions[currentPage - 1].id, grade); // Call handleAnswerChange function with questionId and grade
      setSelectedValue(event.target.value); // Update selectedValue state with the selected value
    },
    value: item, // Set the value of the radio button
    name: "size-radio-button-demo", // Set the name of the radio button group
    inputProps: { "aria-label": item }, // Set aria-label for accessibility
  });
  const handleSubmitResult = () => {
    setShowThankYou(true);
    const payload = {
      userId,
      answers,
    };
    console.log("successfully posted these: ", payload);
    dispatch(postAnswers(payload)); // Dispatch the thunk action with payload
  };

  return (
    <>
      <ToastContainer />
      {/* Render the custom app bar */}
      <ButtonAppBar />
      {/* Apply baseline styles for consistent rendering */}
      <CssBaseline />
      {/* Container to hold the main content */}
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        {/* Conditional rendering based on whether all questions are answered */}
        {allQuestionsAnswered && (
          <Card>
            {/* Card to display the final message */}
            <CardActionArea
              sx={{ width: "fit-content", height: "60vh", marginTop: "1" }}
            >
              <CardContent>
                {/* Display congratulatory message if all questions are answered */}
                {!showThankYou && (
                  <Typography variant="h3" gutterBottom>
                    Congrats! You have answered all questions. <br />
                    {/* Stack component to arrange buttons horizontally */}
                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{ py: 5, justifyContent: "center" }}
                    >
                      {/* Button to quit the test */}
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
                      {/* Button to send the test */}
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
                {/* Display thank you message if showThankYou is true */}
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
            .map((question: any) => (
              <QuestionCard
                key={question.id}
                question={question}
                currentPage={currentPage}
                controlProps={controlProps}
              />
            ))}
      </Container>
      {/* Container to hold the pagination tabs */}
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          position: "fixed",
          bottom: 1,
          width: "100%",
        }}
      >
        {/* Tabs component for pagination */}
        <Tabs
          value={value}
          onChange={handleChangeTab}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons="auto"
        >
          {/* Generate tabs dynamically based on the total number of pages */}
          {Array.from({ length: totalPages }, (_, index) => (
            <Tab key={index} label={`${index + 1}`} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Box>
    </>
  );
};

export default Test;
