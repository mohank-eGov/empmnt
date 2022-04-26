import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import EMPLOYEE_SERVICE from "../service";
import CancelButton from "./CancelButton";
import Input from "./Input";
import Submitbutton from "./SubmitButton";

const schema = yup
  .object({
    name: yup
      .string()
      .matches(/^[A-Za-z ]*$/, "Please enter valid name")
      .max(40)
      .required(),
    email: yup.string().email().required(),
    mobile: yup
      .string()
      .matches(new RegExp("[0-9]{10}"), "Please enter valid Mobile Nmber"),
    age: yup.number().required().positive().integer(),
  })
  .required();
const Form = ({ onSubmit, formValues }) => {
  const nav = useNavigate();
  const { t } = useTranslation();
  const { data, status } = useQuery(
    "departments",
    EMPLOYEE_SERVICE.DEPARTMENTS
  );
  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    if (formValues) {
      console.log(formValues);
      setValue("name", formValues.name);
      setValue("email", formValues.email);
      setValue("mobile", formValues.mobile);
      setValue("age", formValues.age);
      setValue("department_id", formValues.department_id);
    }
  }, [formValues]);
  return (
    <div className="w-full max-w-6xl flex justify-center items-center mt-20">
      <form
        className="bg-white shadow-md rounded px-32 py-10 mb-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input type="text" label="Name" register={register} required />
        <p className="text-red-500 text-sm italic">{errors.name?.message}</p>

        <Input type="text" label="Email" register={register} required />
        <p className="text-red-500 text-sm italic">{errors.email?.message}</p>

        <Input type="text" label="Mobile" register={register} required />
        <p className="text-red-500 text-sm italic">{errors.mobile?.message}</p>

        <label htmlFor="">{t("Department")}</label>
        <select
          {...register("department_id")}
          placeholder="Select department"
          className="form-select appearance-none
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          aria-label="Default select example"
        >
          <option value="">Select {t("Department")}</option>
          {data &&
            data.data &&
            data.data.map((val) => (
              <option key={val.id} value={val.id}>
                {val.department}
              </option>
            ))}
        </select>

        <Input label="Age" register={register} />
        <p className="text-red-500 text-sm italic">
          {errors.age?.message && "Should be Number"}
        </p>

        <div className="flex">
          <Submitbutton>{formValues ? t("Update") : t("Create")}</Submitbutton>
          <CancelButton onClick={() => nav("/")}>{t("Cancel")}</CancelButton>
        </div>
      </form>
    </div>
  );
};

export default Form;
