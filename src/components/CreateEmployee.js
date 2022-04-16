import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Submitbutton from "./Buttons/SubmitButton";
import Input from "./Input";
import EMPLOYEE_SERVICE from "./service";
const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
  })
  .required();

export default function CreateEmployee() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const nav = useNavigate();

  const queryClient = useQueryClient();
  const CREATE = useMutation(EMPLOYEE_SERVICE.CREATE_EMPLOYEE, {
    onSuccess: () => {
      queryClient.invalidateQueries("employees");
    },
  });
  const onSubmit = async (data) => {
    console.log(data);
    await CREATE.mutate({ ...data });
    nav("/");
  };

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

        {/* <Input type="number" label="Phone" register={register} required />
        <Input label="Age" register={register} />
        <p className="text-red-500 text-sm italic">{errors.age?.message}</p> */}

        <Submitbutton>Create</Submitbutton>
      </form>
    </div>
  );
}
