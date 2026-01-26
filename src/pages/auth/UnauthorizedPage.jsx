import React from "react";
import { Link } from "react-router-dom";

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          You do not have permission to view this page.
        </p>
        <div className="space-x-3">
          <Link
            to="/"
            className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Go to Home
          </Link>
          <Link
            to="/login"
            className="inline-block border border-indigo-600 text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-50"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;

