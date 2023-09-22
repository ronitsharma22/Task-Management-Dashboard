const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: Boolean,
  dueDate: Date,
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task