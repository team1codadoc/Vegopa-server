import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxlength: 100, trim: true },
    image: { type: String },
  },
  {
    timestamps: true,
    collection: "Food",
    versionKey: false,
  }
);

const food = mongoose.model("Food", foodSchema);

export default food;
