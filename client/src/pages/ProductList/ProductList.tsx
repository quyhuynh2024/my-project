import React from "react";

import { NavLink, Outlet } from "react-router-dom";

import styles from "./styles.module.css";

function ProductList() {
  const products = [1, 2, 3];
  return (
    <div>
      <h1>Product list page</h1>
      {products.map((product) => (
        <NavLink
          key={product}
          to={`/products/${product}`}
          className={({ isActive }) => {
            return isActive ? styles.linkActive : "";
          }}
        >
          Product {product}
        </NavLink>
      ))}
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default ProductList;
