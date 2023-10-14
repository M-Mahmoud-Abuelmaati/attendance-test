import { NextFunction, Request, Response } from "express";
import { httpStatus } from "../constants";

export default async (
  err: {
    status: number;
    code: number;
    message: string;
    keyPattern: { [key: string]: string };
    keyValue: { [key: string]: string };
  },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.code === 11000) {
    const key = Object.keys(err.keyValue)?.at(0);
    return res.status(httpStatus.BAD_REQUEST).json({
      message: `Duplicate ${key}: ${
        err.keyValue[key as keyof typeof err.keyValue]
      }, Please try another ${key}`,
    });
  }

  if (err.message && err.status)
    return res.status(err.status).json({ message: err.message });

  console.log(err);
  next();
};
