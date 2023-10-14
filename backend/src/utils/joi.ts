import Joi from "joi";
import mongoose from "mongoose";

type IEnumType<E> = Record<keyof E, number | string> & {
  [k: number]: string;
};

const Enum = <E extends IEnumType<E>>(enumObj: E) => {
  let values = Array.isArray(enumObj) ? enumObj : Object.values(enumObj);
  values = values.flatMap((val) => {
    if (Array.isArray(val) || typeof val === "string") return val;
    return Object.values(val);
  });
  return Joi.string().valid(...values);
};

const ObjectId = () =>
  Joi.string()
    .custom((value: string) => {
      if (mongoose.isObjectIdOrHexString(value)) return value;
      throw "not a valid id";
    })
    .message("{:#label} not a valid id");

export { ObjectId, Enum };
