const mongoose = require('mongoose');
// const slug = require('mongoose-slug-updater');
// mongoose.plugin(slug);

const taskSchema = new mongoose.Schema({
    title: String,
    status: String,
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