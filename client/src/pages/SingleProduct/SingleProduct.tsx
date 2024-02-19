import React from "react";
import { useParams } from "react-router-dom";

function SingleProduct() {
  // const params = useParams<{ productId: string }>();
  const params = useParams<{ productId: string }>();
  return (
    <div>
      <h1>Single product page {params.productId}</h1>
    </div>
  );
}

export default SingleProduct;
