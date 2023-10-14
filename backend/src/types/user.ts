import mongoose from "mongoose";

export interface IUserRequest {
  _id: mongoose.Types.ObjectId;
  group: IUserGroup;

}

export interface IUser {
  _id: mongoose.Types.ObjectId;
  group: IUserGroup;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export enum IUserGroup {
  HR = "HR",
  EMPLOYEE = "EMPLOYEE",
}

export interface IUserDocument extends Omit<IUser, "_id">, Document {}