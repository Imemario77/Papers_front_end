import React, { useState } from "react";

import "./DeleteProduct.css";
import { deleteOneProduct } from "../../api/api";

function DeleteProduct(props) {
  const [deleteProductCode, setDeleteProductCode] = useState("");
  const [error, setError] = useState("");

  const handleDeleteProduct = async () => {
    if (deleteProductCode === "")
      return setError("no field should be left empty");
    await deleteOneProduct(deleteProductCode)
      .then((result) => {
        if (result) {
          props.opened(false);
          alert(result.data.result);
        }
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.data.message);
      });
  };

  return (
    <div className="delete-product-modal">
      <h2>Delete Product</h2>
      {error && <p className="error-msg s-16">{error}</p>}
      <input
        onChange={(e) => setDeleteProductCode(e.target.value)}
        value={deleteProductCode}
        placeholder="enter product code: PRDC 10"
        type="text"
      />
      <button onClick={handleDeleteProduct}>Done</button>
    </div>
  );
}

export default DeleteProduct;
