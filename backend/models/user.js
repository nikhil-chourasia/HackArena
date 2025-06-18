import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    githubId: String,
    username: String,
    name: String,
    email: String,
    avatarUrl: String,
    repos: [String],
    skills: [String],
});

export default mongoose.model("User", userSchema);