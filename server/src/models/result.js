import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  responses: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      selectedOption: {
        type: String,
        required: true,
      },
    },
  ],
  takenAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Result", resultSchema);
