import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Radio,
  Typography,
} from "@mui/material";

/**
 * Props for the QuestionCard component.
 */
interface QuestionCardProps {
  question: any; // The question object containing text
  currentPage: number; // Current page number
  controlProps: (item: string) => any; // Function to handle radio button control props
}

/**
 * A component representing a single question card.
 * Displays the question text and radio buttons for selecting options.
 *
 * @param {QuestionCardProps} props - Props for the QuestionCard component.
 * @returns {JSX.Element} - JSX for the QuestionCard component.
 */
const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentPage,
  controlProps,
}) => {
  return (
    <Card>
      <CardActionArea sx={{ width: "65vw", height: "60vh", marginTop: "1" }}>
        <CardContent>
          {/* Display question number */}
          <Typography
            gutterBottom
            variant="h4"
            component="div"
            sx={{ textAlign: "center" }}
          >
            Question {currentPage}
          </Typography>
          {/* Display question text */}
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ py: 5, textAlign: "center" }}
          >
            {question.text}
          </Typography>
        </CardContent>
        {/* Radio buttons for selecting options */}
        <div
          style={{ textAlign: "center", marginTop: "5vh", marginBottom: "2vh" }}
        >
          <Radio
            {...controlProps("1")} // Control props for option 1
            sx={{
              "& .MuiSvgIcon-root": { fontSize: 35 },
              color: "#b0201f",
              "&.Mui-checked": {
                color: "#b0201f",
              },
              "&:hover": {
                bgcolor: "#b0201f",
              },
            }} // Custom styling for radio icon
          />
          <Radio
            {...controlProps("2")} // Control props for option 2
            sx={{
              "& .MuiSvgIcon-root": { fontSize: 25 },
              color: "#b0201f",
              "&.Mui-checked": {
                color: "#b0201f",
              },
              "&:hover": {
                bgcolor: "#b0201f",
              },
            }} // Custom styling for radio icon
          />
          <Radio
            {...controlProps("3")} // Control props for option 3
            sx={{
              "& .MuiSvgIcon-root": { fontSize: 25 },
              color: "#34b020",
              "&.Mui-checked": {
                color: "#34b020",
              },
              "&:hover": {
                bgcolor: "#34b020",
              },
            }} // Custom styling for radio icon
          />
          <Radio
            {...controlProps("4")} // Control props for option 4
            sx={{
              "& .MuiSvgIcon-root": { fontSize: 35 },
              color: "#34b020",
              "&.Mui-checked": {
                color: "#34b020",
              },
              "&:hover": {
                bgcolor: "#34b020",
              },
            }} // Custom styling for radio icon
          />
        </div>
      </CardActionArea>
    </Card>
  );
};

export default QuestionCard;
