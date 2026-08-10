const mongoose = require('mongoose')

const habitSchema = new mongoose.Schema({

title: {
    type: String,
    required: true,
},

user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
},

category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
},

}, {timestamps: true})

const Habit = mongoose.model('Habit', habitSchema)


module.exports = Habit