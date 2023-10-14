import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import { IUserDocument, IUserModel, UserGroup } from "../../types";
import _ from "lodash";
import config from "../../../config";

const UserSchema: Schema<IUserDocument> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    group: { type: String, enum: UserGroup, required: true },
    password: {
      type: String,
      required: false,
      trim: true,
      select: false,
      set: (val: string) =>
        val ? bcrypt.hashSync(val, Number(config.PASSWORD_SALT)) : val,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.statics.logIn = async function (email: string, password: string) {
  const result = await this.findOne({ email }, "_id group password");
  const match = await bcrypt.compare(password, result?.password ?? "");
  if (match) return _.omit(result, ["password"]);
  else return undefined;
};

UserSchema.statics.auth = async function (id: string) {
  return await this.findOne({ _id: id }, "_id group");
};

const User = model<IUserDocument, IUserModel>("User", UserSchema, "User");

export default User;
