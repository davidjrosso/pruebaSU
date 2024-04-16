import { gql } from "@apollo/client";

const clients = gql`
query FindUserBusiness {
  findUserBusiness {
    client {
      id
      name
      surname
      address
      city
      documentNumber
      documentType
      email
      image
      phone
      postCode
      deleted
    }
  }
}
`;

export const QueryClientService = {
  clients,
};
