import React, { lazy, Suspense } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/form/Loading";
import TOAST from "../../components/form/Toast";
import EMPLOYEE_SERVICE from "../../components/service";
const Form = lazy(() => import("../../components/form/Form"));

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
      TOAST.SUCESS("Employee Updated");
      nav("/");
    },
    onError: () => {
      TOAST.ERROR("SomeThing Went Wrong");
    },
  });

  const onSubmit = async (data) => {
    await UPDATE.mutate({ id, ...data });
  };

  if (isLoading) <Loading loading={isLoading} />;
  if (error) <h1>SomeThing Went Wrong!</h1>;
  return (
    <Suspense fallback={<Loading />}>
      <Form
        onSubmit={onSubmit}
        formValues={{
          ...data?.data,
          department_id: data?.data?.department?.department,
        }}
      />
      ;
    </Suspense>
  );
}
