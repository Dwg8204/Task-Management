const mongoose = require('mongoose');
const generate = require('../../../helpers/generate');


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    token: {
        type: String,
    },
    phone: {
        type: String,
        default: null
    },
    avatar: {
        type: String,
        default: null
    },
    status: {
        type: String,
        default: 'active'
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});
const User = mongoose.model('User', userSchema, "users");
module.exports = User;