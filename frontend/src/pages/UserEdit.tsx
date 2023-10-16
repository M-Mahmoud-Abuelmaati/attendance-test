import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apis, axiosInstance } from "../services";
import { IUser } from "../types";
import UserAdd from "./UserAdd";

interface UserEditProps {}

const UserEdit = ({}: UserEditProps) => {
  const { id } = useParams();
  const [employee, setEmployee] = useState<IUser | null>(null);

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        const response = await axiosInstance.get(`${apis.users}/${id}`);
        setEmployee(response.data.data);
      };
      fetchUser();
    }
  }, [id]);

  return <UserAdd initialValues={employee} />;
};

export default UserEdit;
