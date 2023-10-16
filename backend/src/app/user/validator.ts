import Joi from "joi";
import { Enum, ObjectId } from "../../utils/joi";
import { UserGroup } from "../../types";
import { joiMiddleware } from "../../middlewares";

const params = { id: ObjectId().required() };
const paramId = Joi.object({ params });

const create = Joi.object({
  body: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    group: Enum(UserGroup).required(),
    password: Joi.alternatives().conditional("group", {
      is: UserGroup.EMPLOYEE,
      then: Joi.forbidden(),
      otherwise: Joi.string().min(8).required(),
    }),
  },
});

const update = Joi.object({
  params,
  body: {
    name: Joi.string(),
    email: Joi.string().email(),
    group: Enum(UserGroup),
    password: Joi.alternatives().conditional("group", {
      is: UserGroup.EMPLOYEE,
      then: Joi.forbidden(),
      otherwise: Joi.string().min(8),
    }),
  },
});

const getByCriteria = Joi.object({
  query: {
    group: Enum(UserGroup),
  },
});
export default {
  paramId: joiMiddleware(paramId),
  create: joiMiddleware(create),
  update: joiMiddleware(update),
  getByCriteria: joiMiddleware(getByCriteria),
};
