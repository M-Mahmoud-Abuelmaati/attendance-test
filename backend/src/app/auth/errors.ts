import { httpStatus } from "../../constants";

export default {
  Invalid_Credentials: {
    status: httpStatus.NOT_FOUND,
    message: "Invalid User Credentials",
  },

  Not_Authorized: {
    status: httpStatus.BAD_REQUEST,
    message: "User is not authorized to login",
  },
};
