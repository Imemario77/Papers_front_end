import React, { useState } from "react";

import "./RegisterBusiness.css";
import { registerBusiness } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";

function RegisterBusiness(props) {
  const [businessName, setBusinessName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.businessReducer.loading);
  const newError = useSelector((state) => state.businessReducer.error);

  const createBusiness = async (e) => {
    dispatch({ type: "GET_PBUSINESS_STARTED" });
    await registerBusiness({ businessEmail, businessName, description })
      .then((result) => {
        dispatch({
          type: "GET_BUSINESS_SUCCESS",
          payload: result.data.account,
        });
        window.location = "/Dashboard";
      })
      .catch((error) => {
        dispatch({ type: "GET_BUSINESS_FAILED" });
        setError(error.response.data.message);
      });
  };

  return (
    <div className="register-container">
      <h2>Register Business</h2>
      {newError && <p className="warning-msg">{error}</p>}
      <div className="register-details">
        <label htmlFor="business_name">Business Name</label>
        <input
          onChange={(event) => setBusinessName(event.target.value)}
          type="text"
          value={businessName}
          placeholder="Business Name*"
        />
        <label htmlFor="business_name">Business Email</label>
        <input
          onChange={(event) => setBusinessEmail(event.target.value)}
          type="text"
          name=""
          id=""
          placeholder="Business Email*"
          value={businessEmail}
        />
        <label htmlFor="about_business">About business</label>
        <textarea
          onChange={(event) => setDescription(event.target.value)}
          type="text"
          value={description}
          placeholder="Business Name*"
        />
        <button
          disabled={loading}
          className={loading && "disabled-btn"}
          onClick={createBusiness}
        >
          Create Business
        </button>
      </div>
    </div>
  );
}

export default RegisterBusiness;
