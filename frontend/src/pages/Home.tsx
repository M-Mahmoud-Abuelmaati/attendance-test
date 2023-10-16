import { useEffect, useState } from "react";
import Table from "../components/table";
import { IUser } from "../types";
import { apis, axiosInstance } from "../services";
import AppButton from "../components/buttons/AppButton";
import { useNavigate } from "react-router-dom";
import { Routes } from "../constants";

interface HomeProps {}

const Home = ({}: HomeProps) => {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await axiosInstance.get(apis.users);
      setEmployees(
        response.data?.data?.map((user: IUser) => ({
          _id: user._id,
          name: user.name,
          email: user.email,
          group: user.group,
        }))
      );
    };
    fetchEmployees();
  }, []);

  return (
    <div className="my-10 flex flex-col w-5/6 mx-auto gap-2">
      <AppButton
        title="Add User"
        className="w-max self-end"
        onClick={() => navigate(Routes.userAdd)}
      />
      <Table
        cols={["Name", "Email", "Group"]}
        rows={employees}
        className="w-full -mx-4"
        onClick={(id) => navigate(Routes.user(id))}
      />
    </div>
  );
};

export default Home;
