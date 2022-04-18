import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Submitbutton from "./Buttons/SubmitButton";
import Input from "./Input";

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
  })
  .required();
const Form = ({ onSubmit, formValues }) => {
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
      setValue("name", formValues.name);
      setValue("email", formValues.email);
      setValue("mobile", formValues.mobile);
      setValue("age", formValues.age);
    }
  }, [formValues]);
  return (
    <div className="w-full max-w-6xl flex justify-center items-center mt-20">
      <form
        className="bg-white shadow-md rounded px-32 py-10 mb-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input type="text" label="Name" register={register} required />
        <p>{errors.name?.message}</p>

        <Input type="text" label="Email" register={register} required />
        <p className="text-red-500 text-sm italic">{errors.email?.message}</p>

        <Input type="text" label="Mobile" register={register} required />
        <Input label="Age" register={register} />

        <Submitbutton>{formValues ? "Update" : "Create"}</Submitbutton>
      </form>
    </div>
  );
};

export default Form;
