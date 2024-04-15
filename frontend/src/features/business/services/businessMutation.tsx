import { gql } from "@apollo/client";

const createBusiness = gql`
  mutation AddBusiness(
    $user: String
    $address: String
    $name: String!
    $category: String
    $email: String
    $image: String
    $phone: String
  ) {
    addBusiness(
      user: $user
      address: $address
      name: $name
      category: $category
      email: $email
      image: $image
      phone: $phone
    ) {
      name
      address
      category
      email
      image
      phone
      _id
      client {
        id
      }
    }
  }
`;

const updateBusiness = gql`
  mutation UpdateBusiness(
    $id: String!
    $name: String
    $address: String
    $category: String
    $email: String
    $image: String
    $phone: String
  ) {
    updateBusiness(
      _id: $id
      name: $name
      address: $address
      category: $category
      email: $email
      image: $image
      phone: $phone
    ) {
      _id
    }
  }
`;

const deleteBusiness = gql`
  mutation DeleteBusiness($id: String!) {
    deleteBusiness(_id: $id)
  }
`;

export const businessMutationService = {
  createBusiness,
  updateBusiness,
  deleteBusiness,
};
