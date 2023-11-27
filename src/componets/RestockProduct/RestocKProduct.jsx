import React, { useState } from "react";

import { restockProduct } from "../../api/api";
import "./RestockProduct.css";

function RestockProduct(props) {
  const [restockProductCode, setRestockProductCode] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("");

  const handleRestockProduct = async () => {
    if (restockProductCode === "")
      return setError("no field should be left empty");
    await restockProduct({ productCode: restockProductCode, quantity })
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
    <div className="restock-product-modal">
      <h2>Restock Product</h2>
      {error && <p className="error-msg s-16">{error}</p>}
      <input
        onChange={(e) => setRestockProductCode(e.target.value)}
        value={restockProductCode}
        placeholder="enter product code: PRDC 10"
        type="text"
      />
      <input
        onChange={(e) => setQuantity(e.target.value)}
        value={quantity}
        placeholder="Stock quantity"
        type="Number"
      />
      <button onClick={handleRestockProduct}>Done</button>
    </div>
  );
}

export default RestockProduct;
