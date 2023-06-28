const db = require('../config/connection');
const { User, Habit, Diary } = require('../models');
const userSeeds = require('./userSeeds.json');
const habitSeeds = require('./habitSeeds.json');
const diarySeeds = require('./diarySeeds.json');

db.once('open', async () => {
  try {
    await Diary.deleteMany({});
    await Habit.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < habitSeeds.length; i++) {
      const { _id, username } = await Habit.create(habitSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: username },
        {
          $addToSet: {
            habits: _id,
          },
        }
      );
    }

    for (let i = 0; i < diarySeeds.length; i++) {
      const { _id, habitId } = await Diary.create(diarySeeds[i]);
      const habit = await Habit.findOneAndUpdate(
        { _id: habitId },
        {
          $addToSet: {
            diaries: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('All done!');
  process.exit(0);
});