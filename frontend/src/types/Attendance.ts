export interface IAttendance {
  _id: string;
  employee: string;
  checkInAt: Date;
  checkOutAt: Date;
  createdAt: Date;
}
