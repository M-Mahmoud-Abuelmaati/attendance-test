import { IUser, IUserRequest } from "../../types";
import User from "./model";

class UserService {
  constructor(private user: IUser) {}

  async create(user: IUserRequest) {
    return await User.create(this.user);
  }

  public async update(user: IUserRequest, { id }: { id: string }) {
    const result = await User.findOneAndUpdate({ _id: id }, this.user);
    // if (!result) throw Exception.User.Not_Found;
  }

  static async get(user: IUserRequest, { id }: { id: string }) {
    const result = await User.findOne({ _id: id });
    return { data: result };
  }

  static async delete(user: IUserRequest, { id }: { id: string }) {
    const session = await User.startSession();
    await session.withTransaction(async (session) => {
      const userFound = await User.findOne({ _id: id }, {}, { session });

      //   if (!userFound) throw Exception.User.Not_Found;

      const result = await User.deleteOne({ _id: id }, { session });

      //   if (result.deletedCount === 0) throw Exception.User.Not_Found;
    });
  }
}

export default UserService;
