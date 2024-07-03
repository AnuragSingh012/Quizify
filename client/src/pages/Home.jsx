import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get("/quiz"); // Replace with your actual endpoint
        console.log(response.data);
        setQuizData(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchQuizzes();
  }, []);

  return (
    <>
      <h1>Active Quizzes</h1>
      <div className="flex gap-6 flex-wrap justify-center items-center">
        {quizData.map((quiz) => (
          <div key={quiz._id} className="block">
            <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl font-semibold mb-2">{quiz.title}</h2>
              <p className="text-gray-700">{quiz.description}</p>
              <Link to={`/quiz/${quiz._id}`}>
                <div className="flex justify-center items-center mt-4 bg-blue-600 rounded-md text-white p-2">
                  Take Quiz
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
