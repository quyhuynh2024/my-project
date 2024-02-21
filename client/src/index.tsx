import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home, ProductList, SingleProduct } from "./pages";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/products",
    element: <ProductList />,
    children: [
      {
        path: "/products/:productId",
        element: <SingleProduct />,
      },
    ],
  },
  /* {
    path: "/products/:productId",
    element: <SingleProduct />,
  }, */
]);
console.log(process.env.BASE_URL);

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
