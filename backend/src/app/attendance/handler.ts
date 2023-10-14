import { Request, Response } from "express";
import { httpStatus } from "../../constants";
import {
  IAttendance,
  IRequestBody,
  IRequestParams,
  IRequestQuery,
} from "../../types";
import AttendanceService from "./service";

export default {
  async create(req: Request, res: Response) {
    const { body: data } = req;
    await new AttendanceService(data).create();
    res.sendStatus(httpStatus.CREATED);
  },

  async update(
    req: IRequestBody<IAttendance> & IRequestParams<{ id: string }>,
    res: Response
  ) {
    const { body: data, params } = req;
    await new AttendanceService(data).update(params);
    res.sendStatus(httpStatus.OK);
  },

  async getByCriteria(req: IRequestQuery<{ employee: string }>, res: Response) {
    const { query } = req;
    const result = await AttendanceService.getByCriteria(query);
    res.status(httpStatus.OK).json(result);
  },

  async get(req: IRequestParams<{ id: string }>, res: Response) {
    const { params } = req;
    const result = await AttendanceService.get(params);
    res.status(httpStatus.OK).json(result);
  },

  async delete(req: IRequestParams<{ id: string }>, res: Response) {
    const { params } = req;
    await AttendanceService.delete(params);
    res.sendStatus(httpStatus.DELETED);
  },
};
