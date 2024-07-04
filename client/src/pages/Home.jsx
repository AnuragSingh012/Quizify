import React, { useEffect, useState } from "react";
import axios from "axios";
import Hero from "../components/Hero";
import { Link } from "react-router-dom";

const Home = () => {
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchQuizzes = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/quiz"); // Replace with your actual endpoint
        console.log(response.data);
        setQuizData(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  return (
    <>
      <Hero />
      <div className="m-auto max-w-7xl flex gap-6 flex-wrap justify-center items-center">
        {loading ? (
          <div className="mt-6 text-4xl font-semibold">Loading...</div>
        ) : quizData.length === 0 ? (
          <div className="mt-6 text-4xl font-semibold">No Quizzes!</div>
        ) : (
          quizData.map((quiz) => (
            <div className="w-80 mt-4" key={quiz._id}>
              <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-2xl font-semibold mb-2">{quiz.title}</h2>
                <p className="text-gray-700 line-clamp-3">{quiz.description}</p>
                <Link to={`/quiz/${quiz._id}`}>
                  <div className="flex justify-center items-center mt-4 bg-blue-600 rounded-md text-white p-2">
                    Take Quiz
                  </div>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Home;
