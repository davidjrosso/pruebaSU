export interface IBusiness {
    _id: string;
    name: string;
    phone: string;
    email: string;
    address: string;
    category: string;
    image: string;
    touched: string;
  }
  export type IiBusiness = Pick<
    IBusiness,
    "name" | "phone" | "address" | "email"
  >;
  