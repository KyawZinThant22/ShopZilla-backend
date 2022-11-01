export interface IRegister {
  userName: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

export interface ILogin {
  email: string;
  password: string;
}
