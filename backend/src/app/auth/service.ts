import JWT from "jsonwebtoken";
import config from "../../../config";
import { IUserRequest, UserGroup } from "../../types";
import { User } from "../models";
import errors from "./errors";

class AuthService {
  static async login(data: { email: string; password: string }) {
    const user = await User.logIn(data.email, data.password);
    if (!user) throw errors.Invalid_Credentials;
    if (user.group === UserGroup.EMPLOYEE) throw errors.Not_Authorized;
    return { data: this.getAccessToken(user) };
  }

  private static getAccessToken(user: IUserRequest) {
    const accessToken = JWT.sign(
      { _id: user._id, name: user.name, group: user.group },
      config.ACCESS_TOKEN_SECRET,
      {
        expiresIn: `7d`,
      }
    );
    return { accessToken };
  }
}

export default AuthService;
