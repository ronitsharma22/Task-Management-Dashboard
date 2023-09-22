const express = require('express');

// Import models
const Task = require("../Models/Task");

const router = express.Router();

// API endpoint to get all tasks
router.get("/getalltasks", async (req, res) => {
    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ error: "Failed to fetch tasks" });
    }
  });

// API endpoint to get task by id
router.get("/getbyid/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const tasks = await Task.find({_id:id});
      res.json(tasks);
    } catch (error) {
      console.error("Error fetching task:", error);
      res.status(500).json({ error: "Failed to fetch task" });
    }
  });

// API endpoint to create a new Task
router.post("/createtask", async (req, res) => {
    const task  = req.body;
    try {
      const newTask = new Task(task);
      await newTask.save();
      res.json(newTask);
    } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).json({ error: "Failed to create task" });
    }
  });


// API endpoint to update task
router.patch("/updatetask/:id", async (req, res) => {
    const { id } = req.params;
    const { title,description,dueDate,status } = req.body;
    try {
      const updatedTask = await Task.findByIdAndUpdate(
        id,
        { title,description,dueDate,status },
        { new: true }
      );
      res.json(updatedTask);
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ error: "Failed to update task" });
    }
  });

// API endpoint to delete task
router.delete("/deletetask/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await Task.findByIdAndDelete(id);
      res.json({ message: "Task deleted successfully" });
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({ error: "Failed to delete task" });
    }
  });

module.exports = router;
