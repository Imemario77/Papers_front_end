import React, { useState } from "react";
import { FaBars } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "./Navbar.css";

function Navbar(props) {
  const [toogle, setToogle] = useState(false);
  const user = useSelector((state) => state.authReducer.authData);
  return (
    <div className="header scrolled">
      <Link href="/">Papers</Link>
      <nav className={toogle ? "mobile-view-nav" : ""}>
        {toogle && (
          <AiOutlineClose
            style={{
              color: "white",
              position: "absolute",
              right: "9%",
              top: "10px",
              fontSize: "30px",
            }}
            onClick={() => {
              setToogle(false);
            }}
          />
        )}
        <ul className={toogle ? "mobile-view-nav-ul" : "hide"}>
          <Link onClick={() => setToogle(false)} to={"/"}>
            <li>Home</li>
          </Link>
          <li>About</li>
          <a onClick={() => setToogle(false)} href="#service">
            <li>Services</li>
          </a>
          <a onClick={() => setToogle(false)} href="#features">
            <li>Features</li>
          </a>
          <a onClick={() => setToogle(false)} href="#contact">
            <li>Contact</li>
          </a>
          {!user && (
            <Link onClick={() => setToogle(false)} to={"/SignUp"}>
              <li>Get started</li>
            </Link>
          )}
          {user && (
            <Link onClick={() => setToogle(false)} to={"/DashBoard"}>
              <li>Dashboard</li>
            </Link>
          )}
          {!user && (
            <div className="auth">
              <Link onClick={() => setToogle(false)} to={"/Login"}>
                Login
              </Link>
            </div>
          )}
        </ul>
      </nav>
      <p onClick={() => setToogle(true)}>
        <FaBars />
      </p>
    </div>
  );
}

export default Navbar;
