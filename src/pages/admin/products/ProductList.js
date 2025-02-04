import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ProductsList() {
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetcheData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/product");
        setProduct(response.data);
      } catch (error) {
        setError("an error occured while fetching data");
      }
    };
    fetcheData();
  }, []);

  const handleDelete = async (id) => {
    const conf = window.confirm("Do you want to delete");
    if (conf) {
      try {
        const response = await axios.delete(
          "http://localhost:4000/product/" + id
        );
        console.log(response);
        alert("User Deleted successfully");
        setProduct((prevUsers) =>
          prevUsers.filter((client) => client.id !== id)
        );
        navigate("/admin/products");
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div>
      {" "}
      <div className=" text-center">
        <div className="w-[80rem] flex justify-end mt-2">
          <Link to="/admin/createProducts">
            {" "}
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              + Add
            </button>
          </Link>
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <table className="border-2 w-[80rem] mx-auto px-4">
          <thead className="border-2">
            <tr className="border-s-2">
              <th className="border-2">Id</th>
              <th className="border-2">Name</th>
              <th className="border-2">Brand</th>
              <th className="border-2">Category</th>
              <th className="border-2">Price</th>
              <th className="border-2">Description</th>
              <th className="border-2">ImageFilename</th>
              <th className="border-2">CreatedAt</th>
              <th className="border-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {product.map((product) => {
              return (
                <tr className="border-2" key={product.id}>
                  <td className="border-2">{product.id}</td>
                  <td className="border-2">{product.name}</td>
                  <td className="border-2">{product.brand}</td>
                  <td className="border-2">{product.category}</td>
                  <td className="border-2">{product.price} $</td>
                  <td className="border-2">{product.description}</td>
                  <td className="border-2 flex justify-center">
                    <img
                      src={
                        "http://localhost:4000/images/" + product.imageFilename
                      }
                      width="100"
                      alt="..."
                    ></img>
                  </td>
                  <td className="border-2">{product.createdAt}</td>

                  <td className="border-2">
                    <Link to={`/admin/editProducts/${product.id}`}>
                      {" "}
                      <button
                        type="button"
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-2 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      >
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={(e) => handleDelete(product.id)}
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-2 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductsList;
