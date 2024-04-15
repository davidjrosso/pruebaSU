import { gql } from "@apollo/client";

const Project = gql`
query Query($id: ID) {
  findUserBusiness(_id: $id) {
    client {
      name
      surname
      id
      project {
        name
        description
        id
      }
    }
  }
}
`;

export const ProjectQueryService = {
  Project,
};
