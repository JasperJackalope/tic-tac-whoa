const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    habits: [Habit]!
    diaries: [Diary]
    events: [Event]
  }

  type Habit {
    _id: ID
    habitText: String
    category: String
    division: String
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Diary {
    _id: ID
    diaryText: String
    date: String
  }
  
  type Event {
    _id: ID
    eventTitle: String
    start: String
    end: String
  }

  type Query {
    users: [User]
    user(username: String!): User
    habits(username: String): [Habit]
    habit(habitId: ID!): Habit
    me: User
    diaries: [Diary]
    events: [Event]
  }



  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addHabit(habitText: String!, category: String!, division: String!): Habit
    addDiary(diaryText: String!): User
    editDiary(diaryId: ID!, diaryText: String!): Diary
    deleteDiary(diaryId: ID!): Diary
    addEvent(eventTitle: String!, start: String!, end: String!): User
    editEvent(eventId: ID!, eventTitle: String!, start: String!, end: String!): Event
    deleteEvent(eventId: ID!): Event
  }
`;

module.exports = typeDefs;