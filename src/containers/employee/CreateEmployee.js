import React, { lazy, Suspense } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/form/Loading";
import TOAST from "../../components/form/Toast";
import EMPLOYEE_SERVICE from "../../components/service";

const Form = lazy(() => import("../../components/form/Form"));
export default function CreateEmployee() {
  const nav = useNavigate();

  const queryClient = useQueryClient();
  const CREATE = useMutation(EMPLOYEE_SERVICE.CREATE_EMPLOYEE, {
    onSuccess: () => {
      queryClient.invalidateQueries("employees");
      TOAST.SUCESS("Employee Created");
      nav("/");
    },
    onError: () => {
      TOAST.ERROR("SomeThing Went Wrong");
    },
  });
  const onSubmit = async (data) => {
    await CREATE.mutate({ ...data, department_id: data.department_id.value });
  };

  return (
    <Suspense fallback={<Loading />}>
      <Form onSubmit={onSubmit} />;
    </Suspense>
  );
}
