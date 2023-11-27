import React, { useState } from "react";

import "./Customer.css";
import { addCustomer } from "../../api/api";

function Customer(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");

  const AddCustomer = async (e) => {
    e.preventDefault();
    await addCustomer({
      email,
      name,
      number,
      address,
    })
      .then((result) => {
        if (result) {
          props.opened(false);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error) setError(error.response.data.message);
      });
  };

  return (
    <div className="Customer-container">
      {error && <p className="error-msg s-16">{error}</p>}
      <h3>Add Customer</h3>
      <div className="acct-choice new-acct">
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Customer name"
          value={name}
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email address"
          value={email}
        />
        <input
          onChange={(e) => setNumber(e.target.value)}
          type="number"
          placeholder="number"
          value={number}
        />
        <input
          onChange={(e) => setAddress(e.target.value)}
          type="text"
          placeholder="Customer home address"
          value={address}
        />
        <button onClick={AddCustomer} className="send-Customer-choice">
          Send
        </button>
      </div>
    </div>
  );
}

export default Customer;
