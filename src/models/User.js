import mongoose from "mongoose";
import bcrypt from "bcrypt";

const schema = mongoose.Schema;

const userSchema = schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: { type: String, minLength: 6 },
    avatar: { type: String },
    level: { type: Number },
    bookmark: [{ type: mongoose.Schema.Types.ObjectId, ref: "Party" }],
  },
  {
    versionKey: false,
  }
);

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(
    this.password,
    Number(process.env.GEN_SAULT)
  );
});

const User = mongoose.model("User", userSchema);
export default User;
