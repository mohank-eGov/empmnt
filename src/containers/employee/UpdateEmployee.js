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

  const onSubmit = async (formData) => {
    console.log("department_i", formData);
    await UPDATE.mutate({
      id,
      ...formData,
      department_id: formData.department_id.value,
    });
  };

  if (isLoading) <Loading loading={isLoading} />;
  if (error) <h1>SomeThing Went Wrong!</h1>;
  return (
    <Suspense fallback={<Loading />}>
      <Form
        onSubmit={onSubmit}
        formValues={{
          ...data?.data,
        }}
      />
      ;
    </Suspense>
  );
}
