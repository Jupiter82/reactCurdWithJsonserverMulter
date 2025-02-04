import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      {" "}
      <Link to="/admin/products">
        <button
          type="button"
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-2 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Formdata-Imageupload
        </button>
      </Link>
    </div>
  );
}

export default Home;
