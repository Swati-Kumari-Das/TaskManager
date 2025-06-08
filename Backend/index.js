// const express = require('express');
// const cors = require('cors');
// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(express.json());

// let tasks = [
//   { id: 1, title: "Finish report", description: "Complete Q3 summary", status: "todo" },
//   { id: 2, title: "Team meeting", description: "Discuss project goals", status: "done" }
// ];

// let nextId = 3;

// app.get("/tasks", (req, res) => res.json(tasks));

// app.post("/tasks", (req, res) => {
//     const { title, description, status } = req.body;
//     const newTask = {
//         id: nextId++,
//         title,
//         description,
//         status
//     };
//     tasks.push(newTask);
//     res.status(201).json(newTask);
// });

// app.delete("/tasks/:id", (req, res) => {
//     const id = parseInt(req.params.id);
//     tasks = tasks.filter(task => task.id !== id);
//     res.sendStatus(204);
// });

// app.put("/tasks/:id", (req, res) => {
//     const id = parseInt(req.params.id);
//     const { title, description, status } = req.body;
//     tasks = tasks.map(task =>
//         task.id === id ? { ...task, title, description, status } : task
//     );
//     res.sendStatus(200);
// });

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

let tasks = [];
let nextId = 1;

// GET all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// POST a new task
app.post("/tasks", (req, res) => {
  const { title, description, status } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const newTask = {
    id: nextId++,
    title,
    description: description || "",
    status: status || "todo",
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT (update) a task by ID
app.put("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const { title, description, status } = req.body;

  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (status !== undefined) task.status = status;

  res.json(task);
});

// DELETE a task by ID
app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === taskId);

  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks.splice(index, 1);
  res.status(204).send(); // No content
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
