import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import Form from "./Form";
import Loading from "./Loading";
import EMPLOYEE_SERVICE from "./service";

export default function UpdateEmployee() {
  const nav = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery(
    "employe",
    () => EMPLOYEE_SERVICE.EMPLOYEE(id),
    {
      enabled: !!id,
    }
  );

  const UPDATE = useMutation(EMPLOYEE_SERVICE.UPDATE_EMPLOYEE, {
    onSuccess: () => {
      queryClient.invalidateQueries("employees");
    },
  });

  const onSubmit = async (data) => {
    console.log(data, "ll");
    await UPDATE.mutate({ id, ...data });
    nav("/");
  };

  if (isLoading) <Loading loading={isLoading} />;
  return <Form onSubmit={onSubmit} formValues={{ ...data?.data }} />;
}
