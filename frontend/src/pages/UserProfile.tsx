import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apis, axiosInstance } from "../services";
import { IAttendance, IUser } from "../types";
import Table from "../components/table";
import AppButton from "../components/buttons/AppButton";
import { Routes } from "../constants";

interface UserProfileProps {}

const UserProfile = ({}: UserProfileProps) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState<IUser | null>(null);
  const [attendants, setAttendants] = useState<IAttendance[]>([]);

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        const [res1, res2] = await Promise.all([
          await axiosInstance.get(`${apis.users}/${id}`),
          await axiosInstance.get(`${apis.attendants}`, {
            params: { employee: id },
          }),
        ]);
        setEmployee(res1.data.data);
        setAttendants(res2.data.data);
      };
      fetchUser();
    }
    return () => {
      setAttendants([]);
    };
  }, [id]);

  return (
    <div className="flex flex-col my-10 w-5/6 mx-auto">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold">Name: {employee?.name}</h1>
          <h1 className="font-bold">Email: {employee?.email}</h1>
          <h1 className="font-bold">Group: {employee?.group}</h1>
        </div>
        <div className="flex gap-2">
          <AppButton
            title="Add Attendance"
            className="w-36"
            onClick={() => navigate(Routes.attendanceAdd(id))}
          />
          <AppButton
            title="Edit User"
            className="w-36"
            onClick={() => navigate(Routes.userEdit(id))}
          />
        </div>
      </div>

      <Table
        cols={["Date", "Check In", "Check Out"]}
        rows={attendants.map((attendance) => ({
          createdAt: attendance.createdAt,
          checkInAt: attendance.checkInAt,
          checkOutAt: attendance.checkOutAt,
        }))}
      />
    </div>
  );
};

export default UserProfile;
