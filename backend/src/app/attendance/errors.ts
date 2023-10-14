import { httpStatus } from "../../constants";

export default {
  Not_Found: {
    status: httpStatus.BAD_REQUEST,
    message: "Attendance Not Found",
  },

  Already_Exists: {
    status: httpStatus.BAD_REQUEST,
    message: "Attendance already exists",
  },
};
