const express = require('express');
const router = express.Router();

const Task = require('../../../models/task.model');

router.get("/", async (req, res) => {
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

router.get("/detail/:id", async (req, res) => {
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
module.exports = router;