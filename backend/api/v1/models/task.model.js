const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({
    title: String,
    status: {
            type: String,
            enum: ['initial', 'inProgress', 'completed'],
            default: 'initial' // Giá trị mặc định khi tạo mới
        },
    content: String,
    timeStart: Date,
    timeFinish: Date,
    deleted : {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date,
        default: null
    }

},{
    timestamps: true
});
const Task = mongoose.model('Task', taskSchema, "tasks");
module.exports = Task;