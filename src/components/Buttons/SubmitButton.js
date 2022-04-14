import React from "react";

const Submitbutton = ({ children, ...props }) => {
  return (
    <button
      className="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      type="submit"
    >
      {children}
    </button>
  );
};

export default Submitbutton;
