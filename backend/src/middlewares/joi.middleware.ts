import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import _ from "lodash";
import { httpStatus } from "../constants";

export default (schema: ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    let results;

    const validationResult = schema.unknown(true).validate(req, {
      abortEarly: false,
    });

    if (!validationResult.error) {
      results = _.pick(validationResult.value, ["params", "query", "body"]);
    }

    const errors = validationResult?.error?.details?.flatMap((val: any) => {
      if (val.type === "alternatives.match")
        return val.context?.details.map((val: { message: string }) =>
          val.message.split('"').join("")
        );
      return {
        message: val.message.split('"').join(""),
        path: val.context?.label,
      };
    });

    if (errors) {
      return res.status(httpStatus.BAD_REQUEST).json(errors);
    }

    req.params = results!.params;
    req.query = results!.query;
    req.body = results!.body;

    next();
  };
