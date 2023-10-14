import { Request, Response } from "express";
import { httpStatus } from "../../constants";
import { IRequestBody, IRequestParams, IUser } from "../../types";
import UserService from "./service";

export default {
  async create(req: Request, res: Response) {
    const { body: data, user } = req;
    await new UserService(data).create(user);
    res.sendStatus(httpStatus.CREATED);
  },

  async update(
    req: IRequestBody<IUser> & IRequestParams<{ id: string }>,
    res: Response
  ) {
    const { body: data, params, user } = req;
    await new UserService(data).update(user, params);
    res.sendStatus(httpStatus.OK);
  },

  async get(req: IRequestParams<{ id: string }>, res: Response) {
    const { params, user } = req;
    const result = await UserService.get(user, params);
    res.status(httpStatus.OK).json(result);
  },

  async delete(req: IRequestParams<{ id: string }>, res: Response) {
    const { params, user } = req;
    await UserService.delete(user, params);
    res.sendStatus(httpStatus.DELETED);
  },
};
