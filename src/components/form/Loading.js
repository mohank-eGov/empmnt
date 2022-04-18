import React from "react";
import { RingLoader } from "react-spinners";

const Loading = ({ loading }) => {
  return (
    <div>
      <RingLoader
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "22rem",
          width: "100%",
        }}
        color="#36D7B7"
        loading={loading}
        size={60}
      />
    </div>
  );
};

export default Loading;
