import React, { useState } from "react";

import "./Staff.css";
import { addNewUser } from "../../api/api";
import { Navigate } from "react-router-dom";

function Staff(props) {
  const [newStaff, setNewStaff] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("accountant");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const AddStaff = async (e) => {
    e.preventDefault();
    await addNewUser({
      email,
      newUser: newStaff,
      firstname: firstName,
      lastname: lastName,
      number,
      password,
      role,
    })
      .then((result) => {
        if (result) {
          props.opened(false);
        }
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  return (
    <div className="staff-container">
      {error && <p className="error-msg s-16">{error}</p>}
      <h3>Add Staff</h3>
      <div className="staff-choice">
        <button
          onClick={() => setNewStaff(true)}
          title="create a new account for the user"
        >
          New Account
        </button>
        <button
          onClick={() => setNewStaff(false)}
          title="use an existing account"
        >
          Existing Account
        </button>
      </div>
      {!newStaff ? (
        <div className="acct-choice existing-acct">
          <span>Existing Account</span>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="enter existing email address"
            value={email}
          />
          <select
            name=""
            id=""
            onChange={(e) => setRole(e.target.value)}
            value={role}
          >
            <option value="accountant">Accountant</option>
            <option value="sales rep">Sales Representative</option>
            <option value="stock keeper">Store Keeper</option>
            <option value="stock keeper">Sales Manager</option>
          </select>
          <button onClick={AddStaff} className="send-staff-choice">
            Send
          </button>
        </div>
      ) : (
        <div className="acct-choice new-acct">
          <span>New Account</span>
          <input
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            placeholder="First name"
            value={firstName}
          />
          <input
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            placeholder="Last name"
            value={lastName}
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email address"
            value={email}
          />
          <input
            onChange={(e) => setNumber(e.target.value)}
            type="text"
            placeholder="Phone number"
            value={number}
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            value={password}
          />
          <select
            onChange={(e) => setRole(e.target.value)}
            value={role}
            name=""
            id=""
          >
            <option value="accountant">Accountant</option>
            <option value="sales rep">Sales Representative</option>
            <option value="stock keeper">Store Keeper</option>
            <option value="stock keeper">Sales Manager</option>
          </select>
          <button onClick={AddStaff} className="send-staff-choice">
            Send
          </button>
        </div>
      )}
    </div>
  );
}

export default Staff;
