import { gql } from "@apollo/client";

const getUserById = gql`
  query FindOneBusiness($id: ID!) {
    findOneBusiness(_id: $id) {
      name
      address
      category
      image
      email
      phone
    }
  }
`;

const getLoggedInUserInfo = gql`
  query GetLoggedInUserInfo {
    getLoggedInUserInfo {
      address
      image
      name
      password
      phone
      surname
      role
      id
      gender
      email
      business {
        _id
      }
      ativitie {
        _id
      }
      deleted
    }
  }
`;

export const UserQueryServices = {
  getLoggedInUserInfo,
  getUserById
};