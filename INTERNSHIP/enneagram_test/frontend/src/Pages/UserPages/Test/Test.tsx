// src/pages/Test.tsx

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
import { a11yProps } from "../../../utils.ts";
import ButtonAppBar from "../../../components/UserComponents/ButtonAppBar.tsx";
import QuestionCard from "../../../components/UserComponents/QuestionCard.tsx";

const Test: React.FC = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state: any) => state.questions.questions);
  const totalPages = Math.ceil(questions.length / 1); // Assuming 1 question per page
  const [currentPage, setCurrentPage] = useState(1);
  const [value, setValue] = useState(0);
  const [selectedValue, setSelectedValue] = useState("a");
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  useEffect(() => {
    setValue(currentPage - 1);
    if (currentPage === totalPages + 1) {
      setAllQuestionsAnswered(true);
    } else {
      setAllQuestionsAnswered(false);
    }
  }, [currentPage, totalPages]);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setCurrentPage(newValue + 1);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage((prevPage) => {
      const newPage = prevPage + 1;
      setValue(newPage - 1);
      return newPage;
    });
    setSelectedValue(event.target.value);
  };

  const controlProps = (item: string) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "size-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  const handleSendClick = () => {
    setShowThankYou(!showThankYou);
  };

  return (
    <>
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
        {allQuestionsAnswered ? (
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
                      <Button variant="outlined" startIcon={<ExitToAppIcon />}>
                        Quit
                      </Button>
                      <Button
                        variant="contained"
                        endIcon={<SendIcon />}
                        onClick={handleSendClick}
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
        ) : (
          questions
            .slice((currentPage - 1) * 1, currentPage * 1)
            .map((question: any) => (
              <QuestionCard
                key={question.id}
                question={question}
                currentPage={currentPage}
                controlProps={controlProps}
              />
            ))
        )}
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
