import { Schema, model } from "mongoose";
import { IAttendanceDocument, IAttendanceModel } from "../../types";
import _ from "lodash";

const AttendanceSchema: Schema<IAttendanceDocument> = new Schema(
  {
    employee: { type: Schema.Types.ObjectId, ref: "User", required: true },
    checkInAt: { type: Date, required: true },
    checkOutAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Attendance = model<IAttendanceDocument, IAttendanceModel>(
  "Attendance",
  AttendanceSchema,
  "Attendance"
);

export default Attendance;
