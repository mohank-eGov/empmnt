import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateEmployee from "../CreateEmployee";
import Employee from "../Employee";
import UpdateEmployee from "../UpdateEmployee";

export default function RoutesL() {
  return (
    <Routes>
      <Route path="/" element={<Employee />} />
      <Route path="/create" element={<CreateEmployee />} />
      <Route path="/update/:id" element={<UpdateEmployee />} />
    </Routes>
  );
}
