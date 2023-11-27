import React, { useState } from "react";

import "./OTP.css";
import { deleteAndResetPassword } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PassWord() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const email = useSelector((state) => state.otpReducer.email);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (confirmPassword !== password) return alert("password must be the same");
    await deleteAndResetPassword({ email, password, confirmPassword })
      .then((result) => {
        dispatch({ type: "OTP_COMPLETED" });
        alert(result.data.message);
        return navigate("/Login");
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  return (
    <div className="password-change-feild">
      <div className="change-container">
        <label htmlFor="password">New Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="new password"
          value={password}
        />
        <label htmlFor="password">Confirm Password</label>
        <input
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
        />
        <button onClick={handleSubmit}>Done</button>
      </div>
    </div>
  );
}

export default PassWord;
