import React, { lazy, Suspense } from "react";
import Loading from "../../components/form/Loading";

const Table = lazy(() => import("../../components/Table"));
export default function Employee() {
  return (
    <div>
      <h1 className="antialiased text-2xl	mx-8 mt-8">Employee</h1> ​
      <Suspense fallback={<Loading loading={true} />}>
        <Table />
      </Suspense>
    </div>
  );
}
