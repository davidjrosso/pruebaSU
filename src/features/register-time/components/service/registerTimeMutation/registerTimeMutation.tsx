import { gql } from "@apollo/client";

const CreateRegisterTime = gql`
  mutation CreateRecord(
    $user: ID!
    $business: ID!
    $client: ID!
    $project: ID!
    $activities: ID!
    $name: String!
    $inicio: Date!
    $fin: Date!
    $descriptions: String!
    $totalHours: Date!
  ) {
    createRecord(
      user: $user
      business: $business
      client: $client
      project: $project
      activities: $activities
      name: $name
      inicio: $inicio
      fin: $fin
      descriptions: $descriptions
      totalHours: $totalHours
    ) {
      id
      user {
        id
      }
      business {
        id
      }
      client {
        id
      }
      project {
        id
      }

      activities {
        id
      }
      name
      inicio
      fin
      descriptions
      totalHours
    }
  }
`;

export const RegisterTimeServices = {
  CreateRegisterTime,
};
