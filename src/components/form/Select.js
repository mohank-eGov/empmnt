import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import Select1 from "react-select";
import EMPLOYEE_SERVICE from "../service";
export default function Select({ label, control, required, type }) {
  const { t } = useTranslation();
  const { data, status, isLoading, error } = useQuery(
    "departments",
    EMPLOYEE_SERVICE.DEPARTMENTS
  );
  const [options, setOptions] = useState([]);
  useEffect(() => {
    setOptions([]);
    if (!isLoading && !error) {
      data.data.map((val) => {
        setOptions((prev) => [
          ...prev,
          { value: val.department_id, label: val.department },
        ]);
      });
    }
  }, [isLoading, error]);
  if (status === "loading") return <p>Loading</p>;
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {t("Department")}
      </label>
      <Controller
        name={label}
        control={control}
        render={({ field }) => <Select1 {...field} options={options} />}
      />
      {/* <select
        {...register(label)}
        placeholder={"Select" + t("Department")}
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
        <option value="">{"Select" + t("Department")}</option>
        {data.data.map((val) => (
          <option key={val.id} value={val.id}>
            {val.department}
          </option>
        ))}
      </select> */}
    </div>
  );
}
