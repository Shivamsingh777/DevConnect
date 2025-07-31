const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: String
}, { timestamps: true });

const projectSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  description: String,
  link: String,
  comments: [commentSchema]
}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);
