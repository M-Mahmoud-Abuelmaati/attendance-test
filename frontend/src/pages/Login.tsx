import { useFormik } from "formik";
import InputField from "../components/inputs/InputField";
import { useUser } from "../contexts/user";
import AppButton from "../components/buttons/AppButton";
import * as Yup from "yup";

interface LoginProps {}

const Login = ({}: LoginProps) => {
  const { signIn } = useUser();

  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().min(8).required(),
  });

  const { values, errors, handleChange, handleSubmit, setErrors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      signIn!(values)
        .catch((error) =>
          setErrors({
            password: error?.response?.data?.message,
          })
        );
    },
  });

  return (
    <div className="flex flex-col h-full w-full justify-center items-center">
      <form
        className="py-4 px-6 w-96 rounded shadow-md bg-white flex flex-col gap-8 items-center justify-center"
        onSubmit={handleSubmit}
      >
        <h1 className="font-bold text-2xl">Login</h1>
        <InputField
          type="text"
          name="email"
          placeholder="Email"
          value={values.email}
          handleChange={handleChange}
          error={errors.email}
        />
        <InputField
          type="password"
          name="password"
          placeholder="Password"
          value={values.password}
          handleChange={handleChange}
          error={errors.password}
        />
        <AppButton title="Sign In" type="submit" />
      </form>
    </div>
  );
};

export default Login;
