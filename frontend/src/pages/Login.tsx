import { useFormik } from "formik";
import InputField from "../components/inputs/InputField";
import { useUser } from "../contexts/user";
import AppButton from "../components/buttons/AppButton";
import Joi from "joi";

interface LoginProps {}

const Login = ({}: LoginProps) => {
  const { signIn } = useUser();

  const validationSchema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().min(8).required(),
  });

  const { values, errors, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      signIn!(values);
    },
  });

  console.log(errors);

  return (
    <div className="flex flex-col h-full w-full justify-center items-center">
      <form
        className="p-2 rounded shadow-md bg-white flex flex-col gap-5 items-center justify-center"
        onSubmit={handleSubmit}
      >
        <h1>Login</h1>
        <InputField
          type="email"
          name="email"
          placeholder="Email"
          value={values.email}
          handleChange={(e) => setFieldValue("email", e.target.value)}
          error={errors.email}
        />
        <InputField
          name="password"
          placeholder="Password"
          value={values.password}
          handleChange={(e) => setFieldValue("password", e.target.value)}
          error={errors.password}
        />
        <AppButton title="Sign In" type="submit" />
      </form>
    </div>
  );
};

export default Login;
