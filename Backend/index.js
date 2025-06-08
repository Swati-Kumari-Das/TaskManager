const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let tasks = [
  { id: 1, title: "Finish report", description: "Complete Q3 summary", status: "todo" },
  { id: 2, title: "Team meeting", description: "Discuss project goals", status: "done" }
];

let nextId = 3;

app.get("/tasks", (req, res) => res.json(tasks));

app.post("/tasks", (req, res) => {
    const { title, description, status } = req.body;
    const newTask = {
        id: nextId++,
        title,
        description,
        status
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.delete("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== id);
    res.sendStatus(204);
});

app.put("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { title, description, status } = req.body;
    tasks = tasks.map(task =>
        task.id === id ? { ...task, title, description, status } : task
    );
    res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
