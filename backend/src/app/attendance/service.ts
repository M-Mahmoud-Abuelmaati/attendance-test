import moment from "moment";
import { IAttendance, IUserRequest, UserGroup } from "../../types";
import { Attendance } from "../models";
import errors from "./errors";
import mongoose from "mongoose";

class AttendanceService {
  constructor(private attendance: IAttendance) {}

  async create() {
    const session = await Attendance.startSession();
    await session.withTransaction(async (session) => {
      const attendanceFound = await Attendance.findOne(
        {
          employee: this.attendance.employee,
          checkInAt: {
            $gte: moment().startOf("day"),
            $lt: moment().endOf("day"),
          },
        },
        "_id",
        { session }
      );
      if (attendanceFound) throw errors.Already_Exists;

      await Attendance.create(this.attendance);
    });
  }

  public async update({ id }: { id: string }) {
    const result = await Attendance.findOneAndUpdate(
      { _id: id },
      this.attendance
    );
    if (!result) throw errors.Not_Found;
  }

  static async getByCriteria({ employee }: { employee: string }) {
    const condition = employee
      ? { employee: new mongoose.Types.ObjectId(employee) }
      : {};
    const result = await Attendance.find(condition);
    return { data: result };
  }

  static async get({ id }: { id: string }) {
    const result = await Attendance.findOne({ _id: id });
    if (!result) throw errors.Not_Found;
    return { data: result };
  }

  static async delete({ id }: { id: string }) {
    const session = await Attendance.startSession();
    await session.withTransaction(async (session) => {
      const attendanceFound = await Attendance.findOne({ _id: id }, "_id", {
        session,
      });
      if (!attendanceFound) throw errors.Not_Found;

      const result = await Attendance.deleteOne({ _id: id }, { session });

      if (result.deletedCount === 0) throw errors.Not_Found;
    });
  }
}

export default AttendanceService;
