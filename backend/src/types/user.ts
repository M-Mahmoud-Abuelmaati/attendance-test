import mongoose, { Document, Model } from "mongoose";

export interface IUserRequest {
  _id: mongoose.Types.ObjectId | string;
  group: UserGroup;
  name: string;
}

export interface IUser {
  _id: mongoose.Types.ObjectId;
  email: string;
  name: string;
  group: UserGroup;
  password: string;
}

export enum UserGroup {
  HR = "HR",
  EMPLOYEE = "EMPLOYEE",
}

export interface IUserDocument extends Omit<IUser, "_id">, Document {}

export interface IUserModel extends Model<IUserDocument> {
  logIn(email: string, password: string): Promise<IUserRequest | undefined>;
  auth(id: string): Promise<IUserRequest>;
}
