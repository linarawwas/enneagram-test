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
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../../../features/auth/authSlice.js";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

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
  const [value, setValue] = useState(0);
  const [selectedValue, setSelectedValue] = useState("a");
  const [visibleTabs, setVisibleTabs] = useState({ start: 0, end: 20 });

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  useEffect(() => {
    if (currentPage > visibleTabs.end) {
      setVisibleTabs((prev) => ({
        start: prev.start + 1,
        end: prev.end + 1,
      }));
    } else if (currentPage < visibleTabs.start + 1) {
      setVisibleTabs((prev) => ({
        start: Math.max(prev.start - 1, 0),
        end: Math.max(prev.end - 1, 20),
      }));
    }
  }, [currentPage, visibleTabs]);
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    if (page === 40) {
      navigate("/login");
    }
    setCurrentPage(page);
    setValue(page - 1);
  };

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

  const handleScrollLeft = () => {
    setVisibleTabs((prev) => ({
      start: Math.max(prev.start - 1, -1),
      end: Math.max(prev.end - 1, 20),
    }));
  };

  const handleScrollRight = () => {
    setVisibleTabs((prev) => ({
      start: Math.min(prev.start + 1, totalPages),
      end: Math.min(prev.end + 1, totalPages),
    }));
  };

  return (
    <>
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
          <Radio {...controlProps("d")} />
          <Radio
            {...controlProps("c")}
            sx={{
              "& .MuiSvgIcon-root": {
                fontSize: 28,
              },
            }}
          />
        </div>
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            onClick={handleScrollLeft}
            disabled={visibleTabs.start === 0}
          >
            <ArrowBack />
          </IconButton>
          <IconButton
            onClick={handleScrollRight}
            disabled={visibleTabs.end >= totalPages}
          >
            <ArrowForward />
          </IconButton>
        </div>

        <Tabs
          value={value}
          onChange={handleChangeTab}
          aria-label="basic tabs example"
        >
          {Array.from({ length: totalPages }, (_, index) => (
            <Tab
              key={index}
              label={`Item ${index + 1}`}
              {...a11yProps(index)}
              style={{
                display:
                  index >= visibleTabs.start && index < visibleTabs.end
                    ? "block"
                    : "none",
              }}
            />
          ))}
        </Tabs>
      </Box>
    </>
  );
};

export default Test;
