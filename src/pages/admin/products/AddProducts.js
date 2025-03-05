import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Add() {
  const [inputData, setInputData] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    description: "",
    imageFilename: "",
    createdAt: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get("http://localhost:4000/product");
      const product = response.data;

      const newId =
        product.length > 0
          ? (Math.max(...product.map((u) => u.id)) + 1).toString()
          : 1;

      // Prepare formdata
      const formData = new FormData();
      formData.append("id", newId);
      formData.append("name", inputData.name);
      formData.append("brand", inputData.brand);
      formData.append("category", inputData.category);
      formData.append("price", inputData.price);
      formData.append("description", inputData.description);
      formData.append("createdAt", inputData.createdAt);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      await axios.post("http://localhost:4000/product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Data Added Successfully!");
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex w-full h-80 justify-center items-center mt-6">
      <form onSubmit={handleSubmit}>
        <div className="w-80 h-96 border-1 bg-gray-300 p-5 flex flex-col justify-between">
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
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="imageFilename">ImageFile:</label>
            <input
              id="imageFilename"
              type="file"
              accept="image/*"
              onChange={(e) => {
                setImageFile(e.target.files[0]);
              }}
            />
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

export default Add;
