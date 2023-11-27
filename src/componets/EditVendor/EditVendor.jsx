import React, { useState } from "react";

import "./EditVendor.css";
import { editBusinessVendor } from "../../api/api";

function Vendor({ opened, vendorInfo, updatedResult }) {
  const [name, setName] = useState(vendorInfo.name);
  const [email, setEmail] = useState(vendorInfo.email);
  const [address, setAddress] = useState(vendorInfo.address);
  const [number, setNumber] = useState(vendorInfo.number);
  const [error, setError] = useState("");

  const editVendor = async (e) => {
    e.preventDefault();
    await editBusinessVendor({
      email,
      name,
      number,
      address,
      vendorId: vendorInfo._id,
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
    <div className="Vendor-container">
      {error && <p className="error-msg s-16">{error}</p>}
      <h3>Edit Vendor</h3>

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
        <button type="submit" onClick={editVendor} className="send-Vendor-choice">
          Send
        </button>
      </div>
    </div>
  );
}

export default Vendor;
