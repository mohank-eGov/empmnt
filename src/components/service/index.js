import axios from "axios";

const URL = "http://localhost:8080/employee";
const DEPARTMENT_URL = "http://localhost:8080/department";

const EMPLOYEES = () => axios.get(URL);

const DEPARTMENTS = () => axios.get(DEPARTMENT_URL);

const EMPLOYEE = (id) => axios.get(`${URL}/${id}`);

const CREATE_EMPLOYEE = (employee) => axios.post(URL, employee);

const UPDATE_EMPLOYEE = (employee) =>
  axios.put(`${URL}/${employee.id}`, employee);

const DELETE_EMPLOYEE = (id) => axios.delete(`${URL}/${id}`);

const EMPLOYEE_SERVICE = {
  EMPLOYEE,
  EMPLOYEES,
  CREATE_EMPLOYEE,
  UPDATE_EMPLOYEE,
  DELETE_EMPLOYEE,
  DEPARTMENTS,
};

export default EMPLOYEE_SERVICE;
