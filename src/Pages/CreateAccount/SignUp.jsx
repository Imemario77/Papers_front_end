import React, { useState } from "react";
import { IoIosEye } from "react-icons/io";
import { PiEyeSlashFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./Auth.css";
import { signup } from "../../api/api";

function SignUp(props) {
  const [showPwd, setShowPwd] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authReducer.loading);
  const newError = useSelector((state) => state.authReducer.error);

  const SignUp = async (e) => {
    e.preventDefault();
    dispatch({ type: "AUTH_STARTED" });
    await signup({
      firstname: firstName,
      lastname: lastName,
      email,
      number,
      password,
      confirmpassword: confirmPassword,
    })
      .then((result) => {
        dispatch({ type: "AUTH_SUCCESS", payload: result.data.result });
        console.log(result.data.result);
      })
      .catch((error) => {
        dispatch({ type: "AUTH_FAILED" });
        setError(error.response.data.message);
      });
  };

  return (
    <div className="auth-container">
      <h3>Sign Up</h3>
      {newError && <p className="error-msg">{error}</p>}
      <form className="auth-form">
        <label htmlFor="firstname">First Name</label>
        <input
          autoComplete=""
          onChange={(event) => setFirstName(event.target.value)}
          type="text"
          placeholder="Marvel"
          value={firstName}
        />

        <label htmlFor="lastname">Last Name</label>

        <input
          autoComplete=""
          onChange={(event) => setLastName(event.target.value)}
          type="text"
          placeholder="Roselyn"
          value={lastName}
        />

        <label htmlFor="email">Email</label>

        <input
          autoComplete=""
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          placeholder="marvel@gmail.com"
          value={email}
        />

        <label htmlFor="Number">Phone Number</label>

        <input
          autoComplete=""
          onChange={(event) => setNumber(event.target.value)}
          type="text"
          placeholder="08148621067"
          value={number}
        />

        <label htmlFor="password">Password</label>

        <div className="show-passwd">
          <input
            autoComplete=""
            onChange={(event) => setPassword(event.target.value)}
            type={showPwd ? "text" : "password"}
            placeholder="*********"
            value={password}
          />
          {showPwd ? (
            <PiEyeSlashFill
              style={{
                position: "absolute",
                top: "2%",
                right: "0%",
                fontSize: "30px",
              }}
              onClick={() => {
                setShowPwd((prev) => !prev);
              }}
            />
          ) : (
            <IoIosEye
              style={{
                position: "absolute",
                top: "2%",
                right: "0%",
                fontSize: "30px",
              }}
              onClick={() => {
                setShowPwd((prev) => !prev);
              }}
            />
          )}
        </div>
        <label htmlFor="password">confirm Password</label>
        <div className="show-passwd">
          <input
            autoComplete=""
            onChange={(event) => setConfirmPassword(event.target.value)}
            type={showPwd ? "text" : "password"}
            placeholder="*********"
            value={confirmPassword}
          />
          {showPwd ? (
            <PiEyeSlashFill
              style={{
                position: "absolute",
                top: "2%",
                right: "0%",
                fontSize: "30px",
              }}
              onClick={() => {
                setShowPwd((prev) => !prev);
              }}
            />
          ) : (
            <IoIosEye
              style={{
                position: "absolute",
                top: "2%",
                right: "0%",
                fontSize: "30px",
              }}
              onClick={() => {
                setShowPwd((prev) => !prev);
              }}
            />
          )}
        </div>
        <button
          disabled={loading}
          className={loading && "disabled-btn"}
          onClick={SignUp}
        >
          Sign Up
        </button>
        <span style={{ margin: "20px 0" }}>
          Already have an account click here:
          <Link
            style={{ textDecoration: "none", marginLeft: "5px" }}
            to={"/Login"}
          >
            {" "}
            Login
          </Link>
        </span>
      </form>
    </div>
  );
}

export default SignUp;
