import { IUser, IUserRequest, UserGroup } from "../../types";
import { User } from "../models";
import errors from "./errors";

class UserService {
  constructor(private user: IUser) {}

  async create() {
    return await User.create(this.user);
  }

  public async update(user: IUserRequest, { id }: { id: string }) {
    const result = await User.findOneAndUpdate({ _id: id }, this.user);
    if (!result) throw errors.Not_Found;
  }

  static async getByCriteria({ group }: { group: UserGroup }) {
    const condition = group ? { group: { $in: [group] } } : {};
    const result = await User.find(condition);
    return { data: result };
  }

  static async get({ id }: { id: string }) {
    const result = await User.findOne({ _id: id });
    if (!result) throw errors.Not_Found;
    return { data: result };
  }

  static async delete(user: IUserRequest, { id }: { id: string }) {
    const session = await User.startSession();
    await session.withTransaction(async (session) => {
      const userFound = await User.findOne({ _id: id }, "_id", { session });
      if (!userFound) throw errors.Not_Found;
      if (user._id.toString() === userFound._id.toString())
        throw errors.Not_Allowed;

      const result = await User.deleteOne({ _id: id }, { session });

      if (result.deletedCount === 0) throw errors.Not_Found;
    });
  }
}

export default UserService;
