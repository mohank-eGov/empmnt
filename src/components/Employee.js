import React, { lazy, Suspense } from "react";
import Loading from "./Loading";

const Table = lazy(() => import("./Table"));
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
