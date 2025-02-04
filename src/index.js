import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductsList from "./pages/admin/products/ProductList";
import AddProducts from "./pages/admin/products/AddProducts";
import "./index.css";
import EditProduct from "./pages/admin/products/EditProducts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/admin/products" element={<ProductsList />}></Route>
        <Route path="/admin/createProducts" element={<AddProducts />}></Route>
        <Route path="/admin/editProducts/:id" element={<EditProduct />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
