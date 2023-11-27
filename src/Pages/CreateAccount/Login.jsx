import React, { useState } from "react";
import { IoIosEye } from "react-icons/io";
import { PiEyeSlashFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./Auth.css";
import { login, resetPassword } from "../../api/api";

function Login(props) {
  const [showPwd, setShowPwd] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authReducer.loading);
  const newError = useSelector((state) => state.authReducer.error);
  const otpError = useSelector((state) => state.otpReducer.failed);

  const Login = async (e) => {
    e.preventDefault();
    dispatch({ type: "AUTH_STARTED" });
    await login({
      email,
      password,
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

  const handleResetPassword = async (e) => {
    if (!email) return alert("enter your email in the email field");
    await resetPassword({
      email,
    })
      .then((result) => {
        console.log(result);
        dispatch({ type: "OTP_STARTED", email });
        alert(result.data.message);
      })
      .catch((error) => {
        dispatch({ type: "OTP_FAILED" });
        setError(error.response.data.message);
      });
  };

  return (
    <div className="auth-container">
      <h3>Login</h3>
      {(newError || otpError) && <p className="error-msg">{error}</p>}
      <form className="auth-form">
        <label htmlFor="email">Email</label>
        <input
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          autoComplete=""
          placeholder="marvel@gmail.com"
        />
        <label htmlFor="password">Password</label>
        <div className="show-passwd">
          <input
            onChange={(event) => setPassword(event.target.value)}
            type={showPwd ? "text" : "password"}
            autoComplete=""
            placeholder="*********"
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
          onClick={Login}
        >
          Login
        </button>
        <span style={{ margin: "20px 0" }}>
          Don't have an account? click here:
          <Link
            style={{ textDecoration: "none", marginLeft: "5px" }}
            to={"/SignUp"}
          >
            SignUP
          </Link>
        </span>
        <span onClick={handleResetPassword} className="forgot-pass">
          forgot password
        </span>
      </form>
    </div>
  );
}

export default Login;
