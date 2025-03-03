import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {
  const params = useParams();
  const id = params.id;
  const [inputData, setInputData] = useState({
    id: "",
    name: "",
    brand: "",
    category: "",
    price: "",
    description: "",
    imageFilename: "",
    createdAt: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/product/" + id);
        setInputData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:4000/product/${id}`, inputData);
      alert("Data uploaded successfully!");
      navigate("/admin/products");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  return (
    <div className="flex w-full h-80 justify-center items-center mt-20">
      <form onSubmit={handleSubmit}>
        <div className="w-80 h-[30rem] border-1 bg-gray-300 p-5 flex flex-col justify-between">
          <div className="flex flex-col">
            <label htmlFor="Id">Id:</label>
            <input disabled type="text" value={inputData.id}></input>
          </div>
          <div className="flex flex-col">
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              value={inputData.name}
              onChange={(e) => {
                setInputData({ ...inputData, name: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="brand">Brand:</label>
            <input
              id="brand"
              type="text"
              value={inputData.brand}
              onChange={(e) =>
                setInputData({ ...inputData, brand: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="category">Category:</label>
            <input
              id="category"
              type="text"
              value={inputData.category}
              onChange={(e) =>
                setInputData({ ...inputData, category: e.target.value })
              }
            ></input>
          </div>
          <div className="flex flex-col">
            <label htmlFor="price">Price:</label>
            <input
              id="price"
              type="number"
              value={inputData.price}
              onChange={(e) =>
                setInputData({ ...inputData, price: e.target.value })
              }
            ></input>
          </div>
          <div className="flex flex-col">
            <label htmlFor="description">Description:</label>
            <input
              id="description"
              type="text"
              value={inputData.description}
              onChange={(e) =>
                setInputData({ ...inputData, description: e.target.value })
              }
            ></input>
          </div>
          <div className="flex flex-col">
            <label htmlFor="imageFilename">ImageFile:</label>
            <input
              id="imageFilename"
              type="file"
              accept="image"
              onChange={(e) => {
                console.log(e.target.files[0]);
                console.log(e.target.files[0].name);
                setInputData({
                  ...inputData,
                  imageFilename: e.target.files[0].name,
                });
              }}
            ></input>
          </div>
          <div className="flex flex-col">
            <label htmlFor="createdAt">Create Date</label>
            <input
              id="createdAt"
              type="date"
              value={inputData.createdAt}
              onChange={(e) =>
                setInputData({ ...inputData, createdAt: e.target.value })
              }
            ></input>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
