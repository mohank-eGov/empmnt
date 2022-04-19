import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateEmployee from "../../containers/employee/CreateEmployee";
import Employee from "../../containers/employee/Employee";
import UpdateEmployee from "../../containers/employee/UpdateEmployee";

export default function RoutesL() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Employee />} />
        <Route path="/create" element={<CreateEmployee />} />
        <Route path="/update/:id" element={<UpdateEmployee />} />
      </Routes>
      <ToastContainer />
    </>
  );
}
