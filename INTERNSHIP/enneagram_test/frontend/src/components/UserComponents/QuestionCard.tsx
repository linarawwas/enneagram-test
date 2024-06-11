// src/components/QuestionCard.tsx

import React from "react";
import { Card, CardActionArea, CardContent, Radio, Typography } from "@mui/material";

interface QuestionCardProps {
  question: any;
  currentPage: number;
  controlProps: (item: string) => any;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, currentPage, controlProps }) => {
  return (
    <Card>
      <CardActionArea sx={{ width: "fit-content", height: "60vh", marginTop: "1" }}>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div" sx={{ textAlign: "center" }}>
            Question {currentPage}
          </Typography>
          <Typography variant="h4" color="text.secondary" sx={{ py: 5 }}>
            {question.text}
          </Typography>
        </CardContent>
        <div style={{ textAlign: "center", marginTop: "5vh", marginBottom: "2vh" }}>
          <Radio {...controlProps("a")} sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }} />
          <Radio {...controlProps("b")} sx={{ "& .MuiSvgIcon-root": { fontSize: 25 } }} />
          <Radio {...controlProps("d")} sx={{ "& .MuiSvgIcon-root": { fontSize: 30 } }} />
          <Radio {...controlProps("c")} sx={{ "& .MuiSvgIcon-root": { fontSize: 35 } }} />
        </div>
      </CardActionArea>
    </Card>
  );
};

export default QuestionCard;
