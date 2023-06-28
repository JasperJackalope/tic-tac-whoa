import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      }
    }
`;

export const QUERY_ME = gql`
query me {
  me {
    username
    diaries {
      diaryText
      date
      _id
    }
    events {
      _id
      end
      eventTitle
      start
    }
    habits {
      category
      _id
      division
      habitText
    }
    _id
    email
  }
}
`;