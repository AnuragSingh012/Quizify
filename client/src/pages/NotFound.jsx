import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen w-full flex flex-col gap-3 justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <p className="font-bold text-8xl">404</p>
        <p className="font-medium text-gray-600 text-xl">Page not found</p>
      </div>
      <Link to="/" className="font-medium bg-black text-white px-4 py-2 rounded-lg">
        GO TO HOMEPAGE
      </Link>
    </div>
  );
};

export default NotFound;
