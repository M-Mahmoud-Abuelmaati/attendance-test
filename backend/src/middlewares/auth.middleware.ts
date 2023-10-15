import { NextFunction, Request, Response } from "express";
import { httpStatus } from "../constants";
import jwt from "jsonwebtoken";
import config from "../../config";
import { IUserRequest, UserGroup } from "../types";

export default async (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;
  const token = authorization?.split("Bearer ")[1];

  if (!token) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json({ message: "User not authorized" });
  } else {
    try {
      const { _id, group } = jwt.verify(
        token,
        config.ACCESS_TOKEN_SECRET
      ) as IUserRequest;

      if (!_id && !group)
        return res
          .status(httpStatus.UNAUTHORIZED)
          .json({ message: "Invalid Access Token" });

      if (group === UserGroup.EMPLOYEE)
        return res
          .status(httpStatus.UNAUTHORIZED)
          .json({ message: "User is not authorized" });

      req.user = { _id, group };
      next();
    } catch (err: any) {
      console.log(err);
      if (err?.name === "TokenExpiredError")
        return res
          .status(httpStatus.UNAUTHORIZED)
          .json({ message: "Access Token Expired" });
      if (err)
        return res
          .status(httpStatus.UNAUTHORIZED)
          .json({ message: "Invalid Access Token" });
    }
  }
};
