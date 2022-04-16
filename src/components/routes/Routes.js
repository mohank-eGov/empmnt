import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateEmployee from "../CreateEmployee";
import Employee from "../Employee";

export default function RoutesL() {
  return (
    <Routes>
      <Route path="/" element={<Employee />} />
      <Route path="/create" element={<CreateEmployee />} />
    </Routes>
  );
}
