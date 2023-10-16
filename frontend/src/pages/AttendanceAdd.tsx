import { useFormik } from "formik";
import * as Yup from "yup";
import AppButton from "../components/buttons/AppButton";
import DatePicker from "../components/inputs/DatePicker";
import { getMaxDate, getMinDate } from "../utils";
import { apis, axiosInstance } from "../services";
import { useNavigate, useParams } from "react-router-dom";
import { Routes } from "../constants";

interface AttendanceAddProps {}

const AttendanceAdd = ({}: AttendanceAddProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const validationSchema = Yup.object({
    checkInAt: Yup.date()
      .min(
        getMinDate(),
        `Min Check In At is ${getMinDate().format("DD-MM-YYYY")}`
      )
      .max(
        Yup.ref("checkOutAt"),
        "Max Check In At must be earlier than the Check Out At"
      )
      .required()
      .label("Check In"),
    checkOutAt: Yup.date()
      .min(
        Yup.ref("checkInAt"),
        "Min Check Out At must be later than Check In At"
      )
      .max(
        getMaxDate(),
        `Max Check Out At is ${getMaxDate().format("DD-MM-YYYY")}`
      )
      .required()
      .label("Check Out"),
  });

  const createAttendance = async (payload: {
    checkInAt: string;
    checkOutAt: string;
  }) => {
    await axiosInstance.post(apis.attendants, {
      ...payload,
      employee: id,
    });
    navigate(Routes.user(id));
  };

  const { values, errors, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      checkInAt: "",
      checkOutAt: "",
    },
    validationSchema,
    onSubmit: createAttendance,
  });

  return (
    <div className="flex flex-col h-5/6 w-full justify-center items-center">
      <form
        className="py-4 px-6 w-96 rounded shadow-md bg-white flex flex-col gap-8 items-center justify-center"
        onSubmit={handleSubmit}
      >
        <h1 className="font-bold text-2xl">Create Attendance</h1>
        <div className="flex flex-col gap-5 w-full">
          <DatePicker
            placeholder="Check In"
            value={values.checkInAt}
            onChange={(value) => setFieldValue("checkInAt", value)}
            error={errors.checkInAt}
          />
          <DatePicker
            placeholder="Check Out"
            value={values.checkOutAt}
            onChange={(value) => setFieldValue("checkOutAt", value)}
            error={errors.checkOutAt}
          />
        </div>
        <AppButton title="Add" type="submit" />
      </form>
    </div>
  );
};

export default AttendanceAdd;
