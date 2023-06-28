const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const habitSchema = new Schema({
    category: {
        type: String,
        required: true,
    },
    division: {
        type: String,
        required: true,
    },
    habitText: {
        type: String,
        required: 'You need to leave a thought!',
        minlength: 1,
        maxlength: 280,
        trim: true,
    },
});

const Habit = model('Habit', habitSchema);

module.exports = Habit;