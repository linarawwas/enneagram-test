import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions } from "../../../features/questions/questionsApi.js";
import { Container, CssBaseline, Pagination } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Radio from "@mui/material/Radio";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../../../features/auth/authSlice.js";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";

interface State extends SnackbarOrigin {
  open: boolean;
  vertical: "top" | "bottom";
  horizontal: "left" | "center" | "right";
}
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function ButtonAppBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    // Dispatch the clearUser action to clear user info from Redux store
    dispatch(clearUser());
    // Navigate to the sign-in page
    navigate("/login");
    // Add your navigation logic here
  };
  const [state, setState] = useState<State>({
    open: true,
    vertical: "bottom",
    horizontal: "right",
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState: SnackbarOrigin) => () => {
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  return (
    <Box sx={{ flexGrow: 1, marginBottom: 5 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Enneagram Test
          </Typography>
          <Box sx={{ display: "flex" }}>
             <Button
              onClick={handleClick({ vertical: "top", horizontal: "left" })}
              style={{ backgroundColor: "white" }}
            >
              Hint
            </Button>
            <Snackbar
              anchorOrigin={{ vertical, horizontal }}
              open={open}
              onClose={handleClose}
              message="The bigger the size of the circle, the more you agree :)"
              key={vertical + horizontal}
            />
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
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

  const a11yProps = (index: number) => ({
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
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
                      <Button
                        variant="outlined"
                        startIcon={<ExitToAppIcon color="#1976d2" />}
                      >
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
            .map((question) => (
              <Card key={question.id}>
                <CardActionArea
                  sx={{ width: "fit-content", height: "60vh", marginTop: "1" }}
                >
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h4"
                      component="div"
                      sx={{ textAlign: "center" }}
                    >
                      Question {currentPage}
                    </Typography>
                    <Typography
                      variant="h4"
                      color="text.secondary"
                      sx={{ py: 5 }}
                    >
                      {question.text}
                    </Typography>
                  </CardContent>
                  <div
                    style={{
                      textAlign: "center",
                      marginTop: "5vh",
                      marginBottom: "2vh",
                    }}
                  >
                    <Radio
                      {...controlProps("a")}
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: 20,
                        },
                      }}
                    />
                    <Radio
                      {...controlProps("b")}
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: 25,
                        },
                      }}
                    />
                    <Radio
                      {...controlProps("d")}
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: 30,
                        },
                      }}
                    />
                    <Radio
                      {...controlProps("c")}
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: 35,
                        },
                      }}
                    />
                  </div>
                </CardActionArea>
              </Card>
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
            <Tab
              key={index}
              label={`${index + 1}`}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </Box>
    </>
  );
};

export default Test;
