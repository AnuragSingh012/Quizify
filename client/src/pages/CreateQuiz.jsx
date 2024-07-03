import React, { useState } from "react";
import FormField from "../components/FormField";
import axios from "axios";

const CreateQuiz = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([
    { questionText: "", options: ["", "", "", ""], correctAnswer: "" },
  ]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: "", options: ["", "", "", ""], correctAnswer: "" },
    ]);
  };

  const handleChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const quizData = { title, description, questions };
    console.log(quizData);

    try {
      const response = await axios.post("/quiz/create", quizData); // Ensure the correct URL
      console.log(response.data);
    } catch (error) {
      console.error("Error creating quiz", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <FormField
          name="title"
          id="title"
          placeholder="Untitled Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <FormField
          name="description"
          id="description"
          placeholder="Untitled Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {questions.map((question, qIndex) => (
          <div key={qIndex}>
            <FormField
              name={`question-${qIndex}`}
              id={`question-${qIndex}`}
              placeholder="Untitled Question"
              value={question.questionText}
              onChange={(e) =>
                handleChange(qIndex, "questionText", e.target.value)
              }
            />
            {question.options.map((option, oIndex) => (
              <FormField
                key={oIndex}
                name={`option-${qIndex}-${oIndex}`}
                id={`option-${qIndex}-${oIndex}`}
                placeholder={`Option ${oIndex + 1}`}
                value={option}
                onChange={(e) =>
                  handleOptionChange(qIndex, oIndex, e.target.value)
                }
              />
            ))}
            <FormField
              name={`correctAnswer-${qIndex}`}
              id={`correctAnswer-${qIndex}`}
              placeholder="Correct Answer"
              value={question.correctAnswer}
              onChange={(e) =>
                handleChange(qIndex, "correctAnswer", e.target.value)
              }
            />
          </div>
        ))}
        <button type="button" onClick={handleAddQuestion}>
          Add Question
        </button>
        <button type="submit">Create Quiz</button>
      </div>
    </form>
  );
};

export default CreateQuiz;
