export interface IUser {
    homeAddress: string;
    id: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
    image: any;
    address: string;
    gender: string;
    phone: string;
  }
  
  export type ILoginUser = Pick<IUser, "email" | "password">;
  