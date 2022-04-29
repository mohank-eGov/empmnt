import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiFillDelete, AiOutlineEdit } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import Button from "./form/Button";
import Loading from "./form/Loading";
import TOAST from "./form/Toast";
import EMPLOYEE_SERVICE from "./service";

export default function Table() {
  const { t } = useTranslation();

  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [perpage] = useState(3);
  const [user, setUser] = useState();

  const client = useQueryClient();
  const nav = useNavigate();
  const { data, isLoading, error } = useQuery(
    "employees",
    EMPLOYEE_SERVICE.EMPLOYEES
  );
  const DELETE = useMutation(EMPLOYEE_SERVICE.DELETE_EMPLOYEE, {
    onSuccess: () => {
      client.invalidateQueries("employees");
      TOAST.SUCESS("Employee Deleted");
    },
    onError: () => {
      TOAST.ERROR("SomeThing Went Wrong");
    },
  });
  const handlePageClick = (e) => {
    const selectedPage = (e.selected * perpage) % data?.data.length;
    setOffset(selectedPage);
  };
  const serachEmployee = (e) => {
    setSearch(e.target.value);
    setPageCount(Math.ceil(data?.data.length / perpage));
  };
  useEffect(() => {
    if (!isLoading && !error) {
      setPageCount(Math.ceil(data?.data.length / perpage));
    }
  }, [isLoading, error]);
  if (isLoading) <Loading loading={isLoading} />;
  return (
    <div>
      <div className="flex">
        <Button
          onClick={() => {
            nav("/create");
          }}
        >
          {t("Create")}
        </Button>

        <input
          className="form-control
        block
        w-min
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        ml-3
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          value={search}
          onChange={serachEmployee}
          placeholder={t("Search") + "......."}
        />
      </div>

      <div className="flex flex-col shadow-xl shadow-blue-300 mt-10 ml-10 mr-10 ">
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
                      {t("Name")}
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      {t("Email")}
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      {t("Mobile")}
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      {t("Age")}
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      {t("Department")}
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      {t("Actions")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data &&
                    data?.data
                      .filter((val) => {
                        if (val == "") {
                          return val;
                        } else if (
                          val.name
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                          val.email
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                          val.mobile
                            .toLowerCase()
                            .includes(search.toLowerCase())
                        ) {
                          return val;
                        }
                      })

                      .map((val, index) => ({
                        ...val,
                        tableId: index + 1,
                      }))
                      .slice(offset, offset + perpage)
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
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {val.department.department}
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
      <ReactPaginate
        pageCount={pageCount}
        onPageChange={handlePageClick}
        className={"pagination ml-10 mt-10"}
        activeClassName={"active"}
      />
    </div>
  );
}
