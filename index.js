const dotenv = require('dotenv').config();
const express = require("express");
const app = express();

const port = process.env.PORT;
const database = require('./config/database');

database.connect();
const Task = require('./models/task.model');

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find(
        {
            deleted: false
        }
    );
    console.log(tasks);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get("/tasks/detail/:id", async (req, res) => {
    try {
    const task = await Task.findOne(
        {
            deleted: false,
            _id: req.params.id
        }
    );
    console.log(task);
    res.json(task);
  } catch (error) {
    res.json('Không tìm thấy công việc');
  }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
