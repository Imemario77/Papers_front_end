import React, { useState } from "react";

import MainAppNavBar from "../../componets/MainAppNavBar/MainAppNavBar";
import Header from "../../componets/Header/Header";
import "./Profile.css";
import { useDispatch, useSelector } from "react-redux";
import AppModal from "../../componets/AppModal/Modal";
import {
  updateEmail,
  updateFirstame,
  updateLastname,
  updateNumber,
  updatePassword,
} from "../../api/api";

function Profile({ expand, setExpand }) {
  const user = useSelector((state) => state.authReducer.authData);
  const [editFirstName, setEditFirstName] = useState(false);
  const [editLastName, setEditLastName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editNumber, setEditNumber] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [number, setNumber] = useState(user.number);
  const [newPassword, setNewPassword] = useState("");
  const [prevPassword, setPrevPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmitFirstName = async () => {
    await updateFirstame({ firstName })
      .then((result) => {
        dispatch({
          type: "AUTH_SUCCESS",
          payload: result.data.result,
        });
        setEditFirstName(false);
      })
      .catch((error) => {
        console.log(error);
        setEditFirstName(false);
      });
  };
  const handleSubmitlastName = async () => {
    await updateLastname({ lastName })
      .then((result) => {
        dispatch({
          type: "AUTH_SUCCESS",
          payload: result.data.result,
        });
        setEditLastName(false);
      })
      .catch((error) => {
        console.log(error);
        setEditLastName(false);
      });
  };
  const handleSubmitEmail = async () => {
    await updateEmail({ email })
      .then((result) => {
        dispatch({
          type: "AUTH_SUCCESS",
          payload: result.data.result,
        });
        setEditEmail(false);
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.message);
        setEditEmail(false);
      });
  };

  const handleSubmitNumber = async () => {
    await updateNumber({ number })
      .then((result) => {
        dispatch({
          type: "AUTH_SUCCESS",
          payload: result.data.result,
        });
        setEditNumber(false);
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.message);
        setEditNumber(false);
      });
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) return alert("Password's Don't Match");
    await updatePassword({ prevPassword, newPassword })
      .then((result) => {
        alert("Successfully changed password");
        setEditPassword(false);
        setNewPassword("");
        setPrevPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.message);
        setEditPassword(false);
      });
  };

  return (
    <div style={{ position: "relative" }}>
      <div className="dashboard">
        <MainAppNavBar expand={expand} setExpand={setExpand} />
        <div className="content">
          <Header setExpand={setExpand} />
          <div className="all-sales-holder">
            <div class="profile-container">
              <h1>User Profile</h1>

              <div class="profile-item">
                <strong>Email:</strong>{" "}
                <span id="email">{"  " + user.email}</span>
                <button onClick={() => setEditEmail(true)} class="edit-button">
                  Edit
                </button>
              </div>

              <div class="profile-item">
                <strong>First Name:</strong>
                <span id="firstName">{"  " + user.firstName}</span>
                <button
                  onClick={() => setEditFirstName(true)}
                  class="edit-button"
                >
                  Edit
                </button>
              </div>

              <div class="profile-item">
                <strong>Last Name:</strong>
                <span id="lastName">{"  " + user.lastName}</span>
                <button
                  onClick={() => setEditLastName(true)}
                  class="edit-button"
                >
                  Edit
                </button>
              </div>

              <div class="profile-item">
                <strong>Phone Number:</strong>
                <span id="phoneNumber">{"  " + user.number}</span>
                <button onClick={() => setEditNumber(true)} class="edit-button">
                  Edit
                </button>
              </div>

              <div class="profile-item">
                <strong>Password:</strong>
                <span id="password"> *****************</span>
                <button
                  onClick={() => setEditPassword(true)}
                  class="edit-button"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {editFirstName && (
        <AppModal close={() => setEditFirstName(false)}>
          <div className="edit-user-modal">
            <h2>Edit First Name</h2>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
            />
            <button onClick={handleSubmitFirstName}>Done</button>
          </div>
        </AppModal>
      )}
      {editLastName && (
        <AppModal close={() => setEditLastName(false)}>
          <div className="edit-user-modal">
            <h2>Edit Last Name</h2>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
            />
            <button onClick={handleSubmitlastName}>Done</button>
          </div>
        </AppModal>
      )}
      {editEmail && (
        <AppModal close={() => setEditEmail(false)}>
          <div className="edit-user-modal">
            <h2>Edit Email Adddress</h2>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
            />
            <button onClick={handleSubmitEmail}>Done</button>
          </div>
        </AppModal>
      )}
      {editNumber && (
        <AppModal close={() => setEditNumber(false)}>
          <div className="edit-user-modal">
            <h2>Edit Number</h2>
            <input
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              type="text"
            />
            <button onClick={handleSubmitNumber}>Done</button>
          </div>
        </AppModal>
      )}
      {editPassword && (
        <AppModal close={() => setEditPassword(false)}>
          <div className="edit-user-modal">
            <h2>Change Password</h2>
            <input
              value={prevPassword}
              onChange={(e) => setPrevPassword(e.target.value)}
              type="password"
              placeholder="Previous password"
            />
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
              placeholder="New Password"
            />
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              placeholder="Confirm Password"
            />
            <button onClick={handleChangePassword}>Done</button>
          </div>
        </AppModal>
      )}
    </div>
  );
}

export default Profile;
