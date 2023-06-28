import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_DIARY = gql`
mutation Mutation($diaryText: String!) {
  addDiary(diaryText: $diaryText) {
    username
    diaries {
      diaryText
      date
      _id
    }
  }
}
`
export const EDIT_DIARY = gql`
mutation Mutation($diaryId: ID!, $diaryText: String!) {
  editDiary(diaryId: $diaryId, diaryText: $diaryText) {
      diaryText
      _id
  }
}
`
export const DELETE_DIARY = gql`
mutation Mutation($diaryId: ID!) {
  deleteDiary(diaryId: $diaryId) {
      _id
    }
}
`

// XXXX XXX XX X

export const ADD_HABIT = gql`
mutation Mutation($habitText: String!, $category: String!, $division: String!) {
  addHabit(habitText: $habitText, category: $category, division: $division) {
    _id
    category
    division
    habitText

  }
}
`

export const ADD_EVENT = gql`
mutation Mutation($eventTitle: String!, $start: String!, $end: String!) {
  addEvent(eventTitle: $eventTitle, start: $start, end: $end) {
    username
    _id
  }
}
`