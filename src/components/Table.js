import React from "react";
import { AiFillDelete, AiOutlineEdit } from "react-icons/ai";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import Button from "./Buttons/Button";
import Loading from "./Loading";
import EMPLOYEE_SERVICE from "./service";

export default function Table() {
  const client = useQueryClient();
  const nav = useNavigate();
  const { data, isLoading } = useQuery("employees", EMPLOYEE_SERVICE.EMPLOYEES);
  const DELETE = useMutation(EMPLOYEE_SERVICE.DELETE_EMPLOYEE, {
    onSuccess: () => {
      client.invalidateQueries("employees");
    },
  });
  if (isLoading) <Loading loading={isLoading} />;
  return (
    <div>
      <Button
        onClick={() => {
          nav("/create");
        }}
      >
        Create
      </Button>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      name
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      email
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      mobile
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      age
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data
                    ?.map((val, index) => ({
                      ...val,
                      tableId: index + 1,
                    }))
                    .map((val, index) => (
                      <tr className="border-b" key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {val.tableId}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {val.name}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {val.email}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {val.mobile}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {val.age}
                        </td>

                        <td className="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <div className="flex">
                            <AiOutlineEdit
                              className="text-3xl cursor-pointer"
                              onClick={() => nav(`/update/${val.id}`)}
                            />
                            <AiFillDelete
                              className="ml-4 text-3xl cursor-pointer"
                              onClick={() => DELETE.mutate(val.id)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
