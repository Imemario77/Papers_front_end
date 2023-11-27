import React, { useState } from "react";

import "./AddProduct.css";
import { createProduct } from "../../api/api";

function AddProduct(props) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  const AddProduct = async (e) => {
    e.preventDefault();
    await createProduct({
      amount,
      name,
      stock,
      image,
      description,
    })
      .then((result) => {
        if (result) {
          props.opened(false);
          alert(result.data.result);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error) setError(error.response.data.message);
      });
  };

  return (
    <form action="">
      <div className="AddProduct-container">
        {error && <p className="error-msg s-16">{error}</p>}
        <h3>Add Product</h3>

        <div className="acct-choice new-acct">
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Product name"
            value={name}
          />
          <input
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            placeholder="Amount"
            value={amount}
          />
          <input
            onChange={(e) => setStock(e.target.value)}
            type="number"
            placeholder="stock quantity"
            value={stock}
          />
          <input
            onChange={(e) => setImage(e.target.value)}
            type="text"
            placeholder="Image Url"
            value={image}
          />
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder="Description"
            value={description}
          />
          <button onClick={AddProduct} className="send-AddProduct-choice">
            Send
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddProduct;
