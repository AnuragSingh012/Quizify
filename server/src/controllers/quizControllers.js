import Quiz from "../models/quiz.js";

export const getAllQuizzes = async (req, res, next) => {
  try {
    const quizzes = await Quiz.find().populate("creator", "username email");
    if (quizzes) return res.status(200).json(quizzes);
    return res.send("No quizzes Found");
  } catch (err) {
    return res.status(400).json({ message: "ERROR", cause: err.message });
  }
};

export const getQuizById = async (req, res, next) => {
  const quiz = await Quiz.findById(req.params.id);

  if (!quiz) {
    res.status(404);
    throw new Error("Quiz not found");
  }

  res.json(quiz);
};

export const createQuiz = async (req, res) => {
  const { title, description, questions } = req.body;

  if (!title || !description || !questions) {
    return res.status(400).json({ message: "Please add all the fields" });
  }

  const newQuizData = {
    title,
    description,
    questions,
    creator: res.locals.jwtData.id,
  };

  const quiz = new Quiz(newQuizData);

  try {
    await quiz.save();
    res.status(201).json({ message: "Quiz saved successfully" });
  } catch (err) {
    console.error("Error saving quiz:", err);
    res
      .status(500)
      .json({ message: "Unable to save Quiz", error: err.message });
  }
};

export const quizResult = async (req, res, next) => {
  const { id, responses } = req.body;

  try {
    const quiz = await Quiz.findById(id);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    let score = 0;
    const correctAnswers = quiz.questions.map((question, index) => {
      if (question.correctAnswer === responses[index]) {
        score += 1;
      }
      return question.correctAnswer;
    });

    res.status(200).json({
      score,
      totalQuestions: quiz.questions.length,
      correctAnswers,
      responses,
    });
  } catch (err) {
    res.status(500).json({ message: "Error submitting quiz", error });
  }
};

export const deleteQuizById = async (req, res, next) => {
  const quiz = await Quiz.findById(req.params.id);
  if (!quiz) {
    res.status(404);
    throw new Error("Quiz not found");
  }

  try {
    if (quiz.creator.equals(res.locals.jwtData.id)) {
      await Quiz.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: "Quiz deleted successfully" });
    } else {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this quiz" });
    }
  } catch (err) {
    return res.status(400).json({ message: "ERROR", cause: err.message });
  }
};
