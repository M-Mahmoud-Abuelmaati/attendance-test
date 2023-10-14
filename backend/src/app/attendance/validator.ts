import Joi from "joi";
import { ObjectId } from "../../utils/joi";
import { joiMiddleware } from "../../middlewares";

const params = { id: ObjectId().required() };
const paramId = Joi.object({ params });

const create = Joi.object({
  body: {
    employee: ObjectId().required(),
    checkInAt: Joi.date().max("now").required(),
    checkOutAt: Joi.date().max("now").greater(Joi.ref("checkInAt")),
  },
});

const update = Joi.object({
  params,
  body: {
    checkInAt: Joi.date().max("now"),
    checkOutAt: Joi.date().max("now").greater(Joi.ref("checkInAt")),
  },
});

const getByCriteria = Joi.object({
  query: {
    employee: ObjectId(),
  },
});
export default {
  paramId: joiMiddleware(paramId),
  create: joiMiddleware(create),
  update: joiMiddleware(update),
  getByCriteria: joiMiddleware(getByCriteria),
};
