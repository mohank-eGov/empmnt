import axios from "axios";

const URL = "http://localhost:8080/employee";

const EMPLOYEES = () => axios.get(URL);

const EMPLOYEE = (id) => axios.get(`${URL}/${id}`);

const CREATE_EMPLOYEE = (employee) => axios.post(URL, employee);

const UPDATE_EMPLOYEE = (employee, id) => axios.put(`${URL}/${id}`, employee);

const DELETE_EMPLOYEE = (id) => axios.delete(URL + "/" + id);

const EMPLOYEE_SERVICE = {
  EMPLOYEE,
  EMPLOYEES,
  CREATE_EMPLOYEE,
  UPDATE_EMPLOYEE,
  DELETE_EMPLOYEE,
};

export default EMPLOYEE_SERVICE;
