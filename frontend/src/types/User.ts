export enum UserGroup {
  HR = "HR",
  EMPLOYEE = "EMPLOYEE",
}
export interface IUser {
  _id: string;
  group: UserGroup;
  name: string;
  email: string;
  password: string;
}

export interface IUserContext {
  isAuthenticated: boolean;
  user: Partial<IUser> | null;
  loading: boolean;
  signIn: (payload: { email: string; password: string }) => Promise<void>;
}
