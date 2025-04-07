const mongoose = require("mongoose")

const planSchema = new mongoose.Schema({

    website:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subs',
        required: true,

    },
    planName: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    description: {
        type: [String],
        required: true,
    },
    })

module.exports = mongoose.model('Plan', planSchema)    