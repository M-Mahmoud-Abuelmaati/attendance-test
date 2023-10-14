import mongoose, { Model } from "mongoose";
import { Document } from "mongoose";

export interface IAttendance {
  _id: mongoose.Types.ObjectId;
  employee: mongoose.Types.ObjectId;
  checkInAt: Date;
  checkOutAt: Date;
}

export interface IAttendanceDocument
  extends Omit<IAttendance, "_id">,
    Document {}

export interface IAttendanceModel extends Model<IAttendanceDocument> {}
