import React from "react";

const Card = ({ children }) => (
  <div className="bg-gray-900 text-white p-4 rounded-lg shadow-md w-full max-w-md">
    {children}
  </div>
);

export default Card;
