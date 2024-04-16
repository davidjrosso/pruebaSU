import { gql } from "@apollo/client";

const register = gql`
  mutation CreateUser(
    $name: String!
    $email: String!
    $password: String!
    $address: String
    $phone: String
    $surname: String!
    $role: String
    $image: String
    $gender: String
    $deleted: Boolean
  ) {
    createUser(
      name: $name
      email: $email
      password: $password
      address: $address
      phone: $phone
      surname: $surname
      role: $role
      image: $image
      gender: $gender
      deleted: $deleted
    ) {
      surname
      phone
      password
      name
      id
      email
      address
      role
      image
      gender
    }
  }
`;

const login =gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    id
    value
  }
}
`
export const userMutationService={
    register,
    login
}