import { gql } from "@apollo/client";

const createActivitie = gql`
  mutation Mutation(
    $project: ID
    $name: String!
    $user: ID
    $client: ID
    $tiempoEstimado: String
    $costoHora: String
    $description: String
  ) {
    createActivitie(
      project: $project
      name: $name
      user: $user
      client: $client
      tiempoEstimado: $tiempoEstimado
      costoHora: $costoHora
      description: $description
    ) {
      name
      description
      tiempoEstimado
    }
  }
`;
const deleteActivitie = gql`
  mutation deleteActivitie($id: String!) {
    deleteActivitie(_id: $id)
  }
`;
const updateActivitie = gql`
  mutation Mutation(
    $id: String!
    $user: String!
    $project: String!
    $client: String!
    $name: String
  ) {
    updateActivitie(
      _id: $id
      user: $user
      project: $project
      client: $client
      name: $name
    ) {
      _id
      name
      description
      tiempoEstimado
      client
    }
  }
`;
export const MutationActivitie = {
  createActivitie,
  updateActivitie,
  deleteActivitie,
};
