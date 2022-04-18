import i18next from "i18next";
import React, { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import Loading from "../../components/form/Loading";

const Table = lazy(() => import("../../components/Table"));
export default function Employee() {
  const { t } = useTranslation();
  function handleClick(lang) {
    i18next.changeLanguage(lang);
  }

  return (
    <div>
      <button
        className="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded m-1"
        onClick={() => handleClick("en")}
      >
        English
      </button>
      <button
        className=" bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded m-1"
        onClick={() => handleClick("hi")}
      >
        Hindi
      </button>
      <button
        className=" bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded m-1"
        onClick={() => handleClick("tel")}
      >
        Telugu
      </button>
      <button
        className=" bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded m-1"
        onClick={() => handleClick("ka")}
      >
        Kannada
      </button>
      <h1 className="antialiased text-2xl	mx-8 mt-8">{t("Employees.1")}</h1> ​
      <Suspense fallback={<Loading loading={true} />}>
        <Table />
      </Suspense>
    </div>
  );
}
