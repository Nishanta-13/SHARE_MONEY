const mongoose = require('mongoose');

const subsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

subscriptionPlans: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Plan' 
  }]
  
});

module.exports = mongoose.model('Subs', subsSchema);