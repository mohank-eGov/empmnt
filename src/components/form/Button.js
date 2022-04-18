import React from "react";

export default function Button({ children, ...props }) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ml-10"
    >
      {children}
    </button>
  );
}
