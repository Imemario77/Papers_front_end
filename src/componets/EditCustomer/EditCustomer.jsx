import React, { useState } from "react";

import "./EditCustomer.css";
import { editBusinessCustomer } from "../../api/api";

function Customer({ opened, customerInfo, updatedResult }) {
  const [name, setName] = useState(customerInfo.name);
  const [email, setEmail] = useState(customerInfo.email);
  const [address, setAddress] = useState(customerInfo.address);
  const [number, setNumber] = useState(customerInfo.number);
  const [error, setError] = useState("");

  const editCustomer = async (e) => {
    e.preventDefault();
    await editBusinessCustomer({
      email,
      name,
      number,
      address,
      customerId: customerInfo._id,
    })
      .then((result) => {
        if (result) {
          opened(false);
          updatedResult(result.data.result);
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
      <h3>Edit Customer</h3>

      <div className="acct-choice new-acct">
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="First name"
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
          placeholder="billing address"
          value={address}
        />
        <button
          type="submit"
          onClick={editCustomer}
          className="send-Customer-choice"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Customer;
