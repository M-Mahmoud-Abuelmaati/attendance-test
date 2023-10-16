import { Response } from "express";
import { httpStatus } from "../../constants";
import { IRequestBody } from "../../types";
import AuthService from "./service";

export default {
  async login(
    req: IRequestBody<{ email: string; password: string }>,
    res: Response
  ) {
    const { body: data } = req;
    const result = await AuthService.login(data);
    if (result.accessToken) res.status(httpStatus.OK).json(result);
    else res.status(httpStatus.BAD_REQUEST).json(result);
  },
};
