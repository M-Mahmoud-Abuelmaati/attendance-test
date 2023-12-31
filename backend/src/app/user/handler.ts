import { Request, Response } from "express";
import { httpStatus } from "../../constants";
import {
  IRequestBody,
  IRequestParams,
  IRequestQuery,
  IUser,
  UserGroup,
} from "../../types";
import UserService from "./service";

export default {
  async create(req: Request, res: Response) {
    const { body: data } = req;
    await new UserService(data).create();
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

  async getByCriteria(req: IRequestQuery<{ group: UserGroup }>, res: Response) {
    const { query } = req;
    const result = await UserService.getByCriteria(query);
    res.status(httpStatus.OK).json(result);
  },

  async get(req: IRequestParams<{ id: string }>, res: Response) {
    const { params } = req;
    const result = await UserService.get(params);
    res.status(httpStatus.OK).json(result);
  },

  async delete(req: IRequestParams<{ id: string }>, res: Response) {
    const { params, user } = req;
    await UserService.delete(user, params);
    res.sendStatus(httpStatus.DELETED);
  },
};
