import { useNavigate } from "react-router-dom";
import { IUser, UserGroup } from "../types";
import * as Yup from "yup";
import { apis, axiosInstance } from "../services";
import { Routes } from "../constants";
import { useFormik } from "formik";
import AppButton from "../components/buttons/AppButton";
import InputField from "../components/inputs/InputField";
import { useEffect } from "react";
import Select from "../components/inputs/Select";
import { omit } from "lodash";

interface UserAddProps {
  initialValues?: IUser | null;
}

const UserAdd = ({ initialValues }: UserAddProps) => {
  const navigate = useNavigate();
  const title = initialValues ? "Edit User" : "Create User";

  const validationSchema = Yup.object({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    group: Yup.string().oneOf(Object.keys(UserGroup)).required(),
    password: Yup.string().when("group", (group: UserGroup[], field) =>
      group.includes(UserGroup.HR)
        ? field.min(8).required().label("Password")
        : field
    ),
    confirmPassword: Yup.string()
      .when(["password", "group"], ([password, group], field) =>
        password && group.includes(UserGroup.HR)
          ? field
              .required()
              .oneOf([Yup.ref("password")])
              .label("Password")
          : field
      )
      .label("confirm password"),
  });

  const createUser = async (payload: {
    name: string;
    email: string;
    group: string;
    password: string;
    confirmPassword: string;
  }) => {
    await axiosInstance({
      method: initialValues ? "PATCH" : "POST",
      url: initialValues ? `${apis.users}/${initialValues._id}` : apis.users,
      data:
        payload.group === UserGroup.EMPLOYEE
          ? omit(payload, ["password", "confirmPassword"])
          : omit(payload, ["confirmPassword"]),
    });
    navigate(Routes.home);
  };

  const {
    values,
    setValues,
    setFieldValue,
    errors,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      group: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: createUser,
  });

  useEffect(() => {
    if (initialValues) {
      setValues({
        name: initialValues.name,
        email: initialValues.email,
        group: initialValues.group,
        password: "",
        confirmPassword: "",
      });
    }
  }, [initialValues]);

  return (
    <div className="flex flex-col h-5/6 w-full justify-center items-center">
      <form
        className="py-4 px-6 w-96 rounded shadow-md bg-white flex flex-col gap-8 items-center justify-center"
        onSubmit={handleSubmit}
      >
        <h1 className="font-bold text-2xl">{title}</h1>
        <div className="flex flex-col gap-5 w-full">
          <InputField
            type="text"
            name="name"
            placeholder="Name"
            value={values.name}
            handleChange={handleChange}
            error={errors.name}
          />
          <InputField
            type="text"
            name="email"
            placeholder="Email"
            value={values.email}
            handleChange={handleChange}
            error={errors.email}
          />
          <Select
            label="Select a Group"
            value={values.group}
            error={errors.group}
            options={Object.keys(UserGroup)}
            onChange={(value) => setFieldValue("group", value)}
          />
          {values.group === UserGroup.HR && (
            <>
              <InputField
                type="password"
                name="password"
                placeholder="Password"
                value={values.password}
                handleChange={handleChange}
                error={errors.password}
              />
              <InputField
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={values.confirmPassword}
                handleChange={handleChange}
                error={errors.confirmPassword}
              />
            </>
          )}
        </div>
        <AppButton title={title} type="submit" />
      </form>
    </div>
  );
};

export default UserAdd;
