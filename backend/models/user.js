import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  githubId: String,
  username: String,
  name: String,
  avatarUrl: String,
  email: String,
});

export default mongoose.model("User", userSchema);
