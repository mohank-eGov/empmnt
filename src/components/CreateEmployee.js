import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import Form from "./Form";
import EMPLOYEE_SERVICE from "./service";

export default function CreateEmployee() {
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

  return <Form onSubmit={onSubmit} />;
}
