import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
});

export default mongoose.model("user", userSchema);
