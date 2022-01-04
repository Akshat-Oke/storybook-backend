import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  creatorName: {
    type: String,
    // required: true,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  selectedFile: Object,
  tags: [String],
  createdAt: {
    type: Date,
    default: new Date(),
  },
  likes: { type: [String], default: [] },
});

// module.exports = mongoose.model("post", postSchema);
const postMessage = mongoose.model("post", postSchema);
export default postMessage;
