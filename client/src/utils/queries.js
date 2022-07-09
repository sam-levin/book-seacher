import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      post {
        _id
        postText
        createdAt
        replyCount
        replies {
          _id
          createdAt
          reactionBody
          username
        }
      }
      city {
        _id
      }
    }
  }
`;

export const QUERY_POST = gql`
  query post($id: ID!) {
    post(_id: $id) {
      _id
      postText
      createdAt
      username
      replyCount
      replies {
        _id
        createdAt
        username
        replyBody
      }
      city {
        _id
      }
      location {
        _id
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      }
      posts {
        _id
        postText
        createdAt
        replyCount
      }
      city {
        _id
      }
    }
  }
`;

export const QUERY_CITIES = gql`
  query city($name: String!) {
    city(name: $name) {
      _id
      posts {
        _id
        postText
        createdAt
        replyCount
      }
      users {
        _id
        username
        email
      }
    }
  }
`