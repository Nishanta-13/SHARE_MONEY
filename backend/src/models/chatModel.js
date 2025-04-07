const mongoose = require("mongoose")

const chatSchema = new mongoose.Schema({
    message: String,

    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    receiver_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

}, { timestamps: true })

module.exports = mongoose.model("Chat", chatSchema)