import React, { useState, useEffect } from "react";
import FormField from "../components/FormField";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const CreateQuiz = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([
    { questionText: "", options: ["", "", "", ""], correctAnswer: "" },
  ]);

  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth]);

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
      const response = await axios.post("/quiz/create", quizData);
      toast.success("Quiz created successfully");
      console.log(response.data);
    } catch (error) {
      toast.error("Failed to create quiz");
      console.error("Error creating quiz", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="max-w-5xl m-auto flex flex-col">
        <div className=" flex flex-col px-4 py-6 gap-4 border-[0.1px] border-gray-100 rounded-md shadow-lg">
          <FormField
            name="title"
            id="title"
            placeholder="Enter the title of the quiz"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required={true}
            inputClass="text-2xl px-2 py-2 border-b border-t-0 border-l-0 border-r-0 focus:outline-none focus:border-b-2"
          />
          <FormField
            name="description"
            id="description"
            type="textarea"
            placeholder="Enter a brief description of the quiz"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required={true}
            inputClass="text-md px-2 py-2 border-b border-t-0 border-l-0 border-r-0 focus:outline-none focus:border-b-2"
          />
        </div>
        <div className=" py-4 border-[0.1px] shadow-lg  border-gray-100  px-4 rounded-md mt-6">
          {questions.map((question, qIndex) => (
            <div key={qIndex}>
              <FormField
                name={`question-${qIndex}`}
                id={`question-${qIndex}`}
                placeholder="Enter the question"
                value={question.questionText}
                onChange={(e) =>
                  handleChange(qIndex, "questionText", e.target.value)
                }
                required={true}
                inputClass="w-full text-md px-2 py-2 border-b border-t-0 border-l-0 border-r-0 focus:outline-none focus:border-b-2"
              />
              {question.options.map((option, oIndex) => (
                <div className="flex flex-col" key={oIndex}>
                  <div>
                    <span className="mr-2">○</span>
                    <FormField
                      key={oIndex}
                      name={`option-${qIndex}-${oIndex}`}
                      id={`option-${qIndex}-${oIndex}`}
                      placeholder={`Option ${oIndex + 1}`}
                      value={option}
                      required={true}
                      onChange={(e) =>
                        handleOptionChange(qIndex, oIndex, e.target.value)
                      }
                      inputClass="text-md px-2 py-2 border-b border-t-0 border-l-0 border-r-0 focus:outline-none focus:border-b-2"
                    />
                  </div>
                </div>
              ))}
              <div>
                <span>☑</span>
                <FormField
                  name={`correctAnswer-${qIndex}`}
                  id={`correctAnswer-${qIndex}`}
                  placeholder="Correct Answer"
                  value={question.correctAnswer}
                  onChange={(e) =>
                    handleChange(qIndex, "correctAnswer", e.target.value)
                  }
                  required={true}
                  inputClass="text-md px-2 py-2 border-b border-t-0 border-l-0 border-r-0 focus:outline-none focus:border-b-2"
                />
              </div>
            </div>
          ))}
          <button
            className="bg-blue-700 py-2 font-semibold w-full mt-4 text-white rounded-md"
            type="button"
            onClick={handleAddQuestion}
          >
            Add New Question
          </button>
        </div>

        <button
          className="mt-6 mb-12 px-2 py-2 bg-black text-white font-semibold rounded-md"
          type="submit"
        >
          Create Quiz
        </button>
      </div>
    </form>
  );
};

export default CreateQuiz;
