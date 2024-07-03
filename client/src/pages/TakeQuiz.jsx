import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FormField from "../components/FormField";

const TakeQuiz = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [responses, setResponses] = useState([]);
  const [score, setScore] = useState(null);
  const [totalQuestions, setTotalQuestions] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState([]);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`/quiz/${id}`);
        setQuiz(response.data);
        setResponses(response.data.questions.map(() => ""));
      } catch (error) {
        console.error("Error fetching quiz", error);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleResponseChange = (qIndex, value) => {
    const newResponses = [...responses];
    newResponses[qIndex] = value;
    setResponses(newResponses);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const responseData = {
      id,
      responses,
    };

    console.log(responseData);

    try {
      const response = await axios.post("/quiz/result", responseData);
      setScore(response.data.score);
      setTotalQuestions(response.data.totalQuestions);
      setCorrectAnswers(response.data.correctAnswers);
      setResponses(response.data.responses);
      setSubmitted(true);
      console.log("Quiz submitted successfully", response.data);
    } catch (error) {
      console.error("Error submitting quiz", error);
    }
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  const getAnswerClass = (qIndex, option) => {
    if (!submitted) return "";
    if (correctAnswers[qIndex] === option) return "bg-[#f1f8e9] rounded-sm";
    if (responses[qIndex] === option) return "bg-[#fbe9e7] rounded-sm";
    return "";
  };

  const getIcon = (qIndex, option) => {
    if (!submitted) return null;
    if (correctAnswers[qIndex] === option) {
      return <span>✔</span>;
    }
    if (responses[qIndex] === option) {
      return <span>❌</span>;
    }
    return null;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 mb-6 bg-gray-100 px-4 py-4 rounded-md">
        <h1 className="text-3xl font-semibold">{quiz.title}</h1>
        <p className="text-sm">{quiz.description}</p>
      </div>
      <div className="px-4 py-2">
        {quiz.questions.map((question, qIndex) => (
          <div key={qIndex}>
            <p className="font-semibold py-3 text-md">
              {question.questionText}
            </p>
            {question.options.map((option, oIndex) => (
              <div
                key={oIndex}
                className={`${getAnswerClass(qIndex, option)} px-2 my-2 `}
              >
                <FormField
                  name={`question-${qIndex}`}
                  id={`question-${qIndex}-option-${oIndex}`}
                  type="radio"
                  label={option}
                  value={option}
                  checked={responses[qIndex] === option}
                  onChange={(e) => handleResponseChange(qIndex, e.target.value)}
                  labelFirst={false}
                  labelClass="mx-2 font-base text-base"
                  disabled={submitted}
                  required="true"
                />
                {getIcon(qIndex, option)}
              </div>
            ))}
          </div>
        ))}
      </div>

      {!submitted ? (
        <div className="flex justify-center items-center bg-blue-700 mt-4 mb-10 text-white rounded-md py-2 font-semibold">
          <button className="w-full" type="submit">
            Submit Quiz
          </button>
        </div>
      ) : (
        <div className="flex text-3xl justify-center items-center mt-4 mb-14 text-black rounded-md py-2 font-semibold">
          <p>
            You scored {score} out of {totalQuestions}.
          </p>
        </div>
      )}
    </form>
  );
};

export default TakeQuiz;
