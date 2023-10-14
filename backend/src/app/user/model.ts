import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import { IUserDocument, IUserGroup } from "../../types";

const UserSchema: Schema<IUserDocument> = new Schema({
  group: { type: String, enum: IUserGroup, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: {
    type: String,
    required: true,
    trim: true,
    select: false,
    set: (val: string) => (val ? bcrypt.hashSync(val, 10) : val),
  },
});

const User = model<IUserDocument>("User", UserSchema, "User");

export default User;
