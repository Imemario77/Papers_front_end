// OTPVerification.jsx

import React, { useState } from "react";
import "./OTP.css"; // Import the CSS file
import { resendOtp, verifyOtp } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OTP = () => {
  // State to store the individual digits of the OTP
  const [otp, setOTP] = useState(["", "", "", ""]);
  const email = useSelector((state) => state.otpReducer.email);
  const dispatch = useDispatch();
  // Refs for individual input elements
  const inputRefs = [1, 2, 3, 4].map(() => React.createRef());
  const navigate = useNavigate();
  // Function to handle individual digit input changes
  const handleInputChange = (index, value) => {
    // Update the OTP array with the new value
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    // Move to the next input if the current input has a value
    if (value !== "" && index < 3) {
      inputRefs[index + 1].current.focus();
    } else if (value === "") {
      inputRefs[index - 1].current.focus();
    }
  };

  // Function to handle pasting values into the inputs
  const handleInputPaste = (event) => {
    event.preventDefault();
    const pastedData = event.clipboardData.getData("text/plain").split("");

    // Update the OTP array with the pasted values
    const newOTP = Array(4).fill("");
    pastedData.forEach((value, index) => {
      newOTP[index] = value;
    });
    setOTP(newOTP);
  };

  // Function to handle the OTP verification logic
  const handleSubmit = async () => {
    const enteredOTP = otp.join("");
    await verifyOtp({ otpNumber: enteredOTP, email })
      .then(() => {
        dispatch({ type: "OTP_SUCCESS" });
        return navigate("/NewPassword");
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.message);
      });
  };

  const handleResendOtp = async () => {
    await resendOtp({ email })
      .then((result) => {
        alert(result.data.message);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  return (
    <div className="otp-verification-container">
      <h2>OTP Verification</h2>
      <form>
        {otp.map((value, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={value}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onPaste={handleInputPaste}
            ref={inputRefs[index]}
          />
        ))}
      </form>
      <button type="button" onClick={handleSubmit}>
        Verify OTP
      </button>
      <button type="button" onClick={handleResendOtp}>
        Resend OTP
      </button>
    </div>
  );
};

export default OTP;
