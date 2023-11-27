import React from "react";
import { Link } from "react-router-dom";

import "./MainNavBar.css";
import Logo from "../../assets/Papers 2.png";
function MainAppNavBar({ expand, setExpand }) {

  return (
    <div className={expand ? "side-panel  reduce-panel" : "side-panel"}>
      <div className="logo-holder">
        <img src={Logo} alt="profile image" />
      </div>

      <nav>
        <Link
          onClick={() => setExpand(true)}
          className="no-underline"
          to={"/Dashboard"}
        >
          <span>dashboard </span>
        </Link>
        <Link
          onClick={() => setExpand(true)}
          className="no-underline"
          to={"/Expenses"}
        >
          <span>Expenses</span>
        </Link>
        <Link
          onClick={() => setExpand(true)}
          className="no-underline"
          to={"/Inventory"}
        >
          <span>Inventory</span>
        </Link>
        <Link
          onClick={() => setExpand(true)}
          className="no-underline"
          to={"/Invoice"}
        >
          <span>Invoice</span>
        </Link>
        <Link
          onClick={() => setExpand(true)}
          className="no-underline"
          to={"/AllVendors"}
        >
          <span>Vendor</span>
        </Link>
        <Link
          onClick={() => setExpand(true)}
          className="no-underline"
          to={"/AllStaffs"}
        >
          <span>All Staffs</span>
        </Link>
        <Link
          onClick={() => setExpand(true)}
          className="no-underline"
          to={"/AllCustomers"}
        >
          <span>All Customers</span>
        </Link>
        <Link
          onClick={() => setExpand(true)}
          className="no-underline"
          to={"/Sales"}
        >
          <span>Sales</span>
        </Link>
    
      </nav>
    </div>
  );
}

export default MainAppNavBar;
