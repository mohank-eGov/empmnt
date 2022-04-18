import React from "react";

export default function CancelButton({ children, ...props }) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className="bg-transparent hover:bg-red-500 text-red-500 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded ml-10"
    >
      {children}
    </button>
  );
}
