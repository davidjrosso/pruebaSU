import { gql } from "@apollo/client";

const GetActivities = gql`
  query GetActivities {
    findUserBusiness {
      name
      client {
        name
        surname
        id
        project {
          name
          description
          id
          activitie {
            name
            description
            _id
          }
        }
      }
    }
  }
`;
export const QueryActivities = { GetActivities };
