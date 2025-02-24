import React from "react";

const Button = ({ children, onClick }) => (
  <button className="w-full bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-lg mt-4" onClick={onClick}>
    {children}
  </button>
);

export default Button;
