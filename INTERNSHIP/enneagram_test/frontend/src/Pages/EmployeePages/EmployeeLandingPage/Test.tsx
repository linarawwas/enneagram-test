import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions } from "../../../features/questions/questionsApi.js";

const Test: React.FC = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const questions = useSelector((state:any) => state.questions.questions);
  const totalPages = Math.ceil(questions.length / 1); // Assuming 1 question per page

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="employee-landing-page">
      <h1 className="welcome-message-employee"> Welcome to test</h1>
      <div>
        {questions.slice((currentPage - 1) * 1, currentPage * 1).map((question) => (
          <div key={question.id}>
            <h2>{question.text}</h2>
          </div>
        ))}
      </div>
      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Test;
