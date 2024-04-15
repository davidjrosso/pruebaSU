import { gql } from "@apollo/client";

const FindUserBusiness = gql`
  query FindOneBusiness($id: ID) {
    findUserBusiness(_id: $id) {
      _id
      name
      phone
      email
      address
      image
      category
      client {
        name
      }
    }
  }
`;

export const businessQueryService = {
  FindUserBusiness,
};
