const { AuthenticationError } = require("apollo-server-express");
const { User, Habit, Diary, Event } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("habits").populate("diaries").populate("events");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("habits").populate("diaries").populate("events");
    },
    habits: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Habit.find(params).sort({ createdAt: -1 });
    },
    habit: async (parent, { thoughtId }) => {
      return Habit.findOne({ _id: habitId });
    },
    me: async (parent, args, context) => {
      console.log('Im in the me function')
      if (context.user) {
        console.log('im in the if')
        const user = User.findOne({ _id: context.user._id }).populate("habits").populate("diaries").populate("events");
        console.log(user)
        return user
      }
      throw new AuthenticationError("You need to be logged in!");
    }
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addHabit: async (parent, { habitText, category, division }, context) => {
      if (context.user) {
        const habit = await Habit.create({
          habitText, category, division 
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { habits: habit._id } }
        );

        return habit;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addDiary: async (parent, { diaryText }, context) => {
      if (context.user) {
        const diary = await Diary.create({
          diaryText,
        });
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { diaries: diary._id } }
        ).populate('diaries');

        return user;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addEvent: async (parent, { eventTitle, start, end }, context) => {
      if (context.user) {
        const event = await Event.create({
          eventTitle,
          start,
          end,
        });

        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { events: event._id } },
          { new: true }
        ).populate("events");

        return user;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    editEvent: async (parent, { eventId, eventTitle, start, end }, context) => {
      if (context.user) {
        const event = await Event.findOneAndUpdate(
          { _id: eventId },
          { eventTitle, start, end },
          { new: true }
        );

        if (!event) {
          throw new Error("Event not found");
        }

        return event;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    editDiary: async (parent, { diaryId, diaryText }, context) => {
      if (context.user) {
        const diary = await Diary.findOneAndUpdate(
          { _id: diaryId },
          { diaryText },
          { new: true }
        );

        if (!diary) {
          throw new Error("Diary entry not found");
        }

        return diary;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    deleteDiary: async (parent, { diaryId }, context) => {
      if (context.user) {
        const diary = await Diary.findOneAndDelete({ _id: diaryId });

        if (!diary) {
          throw new Error("Diary entry not found");
        }

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { diaries: diary._id } }
        );

        return diary;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    deleteEvent: async (parent, { eventId }, context) => {
      if (context.user) {
        const event = await Event.findOneAndDelete({ _id: eventId });

        if (!event) {
          throw new Error("Event not found");
        }

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { events: event._id } }
        );

        return event;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
