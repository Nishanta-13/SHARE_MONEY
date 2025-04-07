const mongoose = require("mongoose")


const connectSchema = new mongoose.Schema({

    webname: String,
    require_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    is_connect: {
        type: String,
        default: '0'
    }

}, { timestamps: true })

modeule.exports = mongoose.model("Connect", connectSchema)