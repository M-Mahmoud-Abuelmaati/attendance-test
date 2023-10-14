import { httpStatus } from "../../constants";

export default {
  Not_Found: {
    status: httpStatus.BAD_REQUEST,
    message: "User Not Found",
  },

  Not_Allowed: {
    status: httpStatus.BAD_REQUEST,
    message: "Not allowed to delete yourself",
  },
};
