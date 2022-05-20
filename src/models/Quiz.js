import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    selects: [
      {
        title: { type: String, required: true, maxlength: 100, trim: true },
        contents: { type: String, required: true, trim: true },
        type: { type: String, trim: true },
      },
    ],
  },
  {
    timestamps: true,
    collection: "Quiz",
    versionKey: false,
  }
);

const quiz = mongoose.model("Quiz", quizSchema);

export default quiz;
