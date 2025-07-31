const express = require("express");
const Project = require("../models/Project");
const auth = require("../middleware/auth");

const router = express.Router();

// Create project
router.post("/", auth, async (req, res) => {
  const project = await Project.create({ ...req.body, user: req.userId });
  res.json(project);
});

// Get all projects
router.get("/", async (req, res) => {
  const projects = await Project.find().populate("user", "name");
  res.json(projects);
});

// Comment on a project
router.post("/:id/comment", auth, async (req, res) => {
  const project = await Project.findById(req.params.id);
  project.comments.push({ user: req.userId, text: req.body.text });
  await project.save();
  res.json(project);
});

module.exports = router;
