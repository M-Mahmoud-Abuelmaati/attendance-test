import { Query, Request, ParamsDictionary } from "express-serve-static-core";

export * from "./user";

export interface IRequestBody<T> extends Request {
  body: T;
}
export interface IRequestQuery<T extends Query> extends Request {
  query: T;
}
export interface IRequestParams<T extends ParamsDictionary> extends Request {
  params: T;
}
