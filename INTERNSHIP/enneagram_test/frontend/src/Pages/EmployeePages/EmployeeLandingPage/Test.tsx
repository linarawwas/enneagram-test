import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions } from "../../../features/questions/questionsApi.js";
import { Container, CssBaseline, Pagination } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Radio from "@mui/material/Radio";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../../../features/auth/authSlice.js";
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
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            your personality test
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const Test: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const questions = useSelector((state: any) => state.questions.questions);
  const totalPages = Math.ceil(questions.length / 1); // Assuming 1 question per page
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    if (page === 40) {
      navigate("/login");
    }
    setCurrentPage(page);
  };

  const [selectedValue, setSelectedValue] = React.useState("a");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(currentPage + 1);
    setSelectedValue(event.target.value);
  };

  const controlProps = (item: string) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "size-radio-button-demo",
    inputProps: { "aria-label": item },
  });
  return (
    <>
      <ButtonAppBar />
      <CssBaseline />

      <Container maxWidth="sm">
        {questions
          .slice((currentPage - 1) * 1, currentPage * 1)
          .map((question) => (
            <Card sx={{ maxWidth: 650, margin: 10 }} key={question.id}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Question {currentPage}
                  </Typography>
                  <Typography variant="h3" color="text.secondary">
                    {question.text}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        <div style={{ textAlign: "center" }}>
          <Radio {...controlProps("a")} size="small" />
          <Radio {...controlProps("b")} />
          <Radio {...controlProps("b")} />
          <Radio
            {...controlProps("c")}
            sx={{
              "& .MuiSvgIcon-root": {
                fontSize: 28,
              },
            }}
          />

          {/* <Pagination key={currentPage}
            count={totalPages}
            defaultPage={currentPage}
            siblingCount={0}
            onChange={handlePageChange}
          /> */}
        </div>
      </Container>
    </>
  );
};

export default Test;
