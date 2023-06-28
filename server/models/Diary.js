const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const diarySchema = new Schema({
  diaryText: {
    type: String,
    required: 'You need to leave a thought!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const Diary = model('Diary', diarySchema);

module.exports = Diary;
