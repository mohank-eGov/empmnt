import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import CancelButton from "./CancelButton";
import Input from "./Input";
import Select from "./Select";
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
  const {
    register,
    handleSubmit,
    setValue,

    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      department_id: formValues && {
        value: formValues.department.id,
        label: formValues.department.department,
      },
    },
  });
  useEffect(() => {
    if (formValues) {
      setValue("name", formValues.name);
      setValue("email", formValues.email);
      setValue("mobile", formValues.mobile);
      setValue("age", formValues.age);
    }
  }, [formValues]);
  return (
    <div className="w-full max-w-6xl flex justify-center items-center mt-20">
      <form
        className="bg-white shadow-lg shadow-blue-300 rounded px-32 py-10 mb-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input type="text" label="Name" register={register} required />
        <p className="text-red-500 text-sm italic">{errors.name?.message}</p>

        <Input type="text" label="Email" register={register} required />
        <p className="text-red-500 text-sm italic">{errors.email?.message}</p>

        <Input type="text" label="Mobile" register={register} required />
        <p className="text-red-500 text-sm italic">{errors.mobile?.message}</p>

        <Input label="Age" register={register} />
        <p className="text-red-500 text-sm italic">
          {errors.age?.message && "Should be Number"}
        </p>
        <Select label={"department_id"} register={register} control={control} />
        <div className="flex">
          <Submitbutton>{formValues ? t("Update") : t("Create")}</Submitbutton>
          <CancelButton
            onClick={() => {
              nav("/");
            }}
          >
            {t("Cancel")}
          </CancelButton>
        </div>
      </form>
    </div>
  );
};

export default Form;
