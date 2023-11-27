import React, { useState } from "react";
import { AiOutlineBars } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { logout } from "../../api/api";
import "./Header.css";

function Header({ setExpand }) {
  const businessName = useSelector(
    (state) => state.businessReducer.businessData.name
  );
  const [showNav, setShowNav] = useState(false);
  const fName = useSelector((state) => state.authReducer.authData.firstName);
  const lName = useSelector((state) => state.authReducer.authData.lastName);
  const Logout = () => {
    logout();
    localStorage.removeItem("persist:root");
    window.location = "/Login";
  };

  return (
    <div className="main-header">
      <div>
        <span onClick={() => setExpand((prev) => !prev)}>
          <AiOutlineBars />
        </span>
        <h1>{businessName}</h1>
      </div>
      <p onClick={() => setShowNav((prev) => !prev)}>
        Welcome, {fName} {lName}
        <FaRegUserCircle className="user-icon-display" />
      </p>
      {showNav && (
        <nav>
          <Link className="no-underline" to={"/Profile"}>
            <span>Profile</span>
          </Link>
          <Link onClick={Logout} className="no-underline" to={""}>
            <span>Logout</span>
          </Link>
        </nav>
      )}
    </div>
  );
}

export default Header;
