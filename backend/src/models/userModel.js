const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name: String,
    image: Buffer,
    email: String,
    password: String,
    is_online: {
        type: String,
        default: '0'
    },

}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);