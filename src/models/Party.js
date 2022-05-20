import mongoose from "mongoose";

const partySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxlength: 100, trim: true },
    image: { type: String },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    total: { type: Number, min: 2 },
    taste: [{ type: String }],
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    meetingDate: { type: Date },
    location: { type: String },
    coordinates: { lat: Number, lng: Number },
  },
  {
    timestamps: true,
    collection: "Party",
    versionKey: false,
  }
);

const party = mongoose.model("Party", partySchema);

export default party;
