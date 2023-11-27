import React from "react";
import { RiRegisteredFill } from "react-icons/ri";

import "./Welcome.css";
import { Link } from "react-router-dom";
import BookKeeping from "../../assets/Introduction-to-Bookkeeping.webp";
import Demo from "../../assets/bgimg.jpg";
import Footer from "../../componets/Footer/footer";
import Navbar from "../../componets/Navbar/Navbar";

function Welcome(props) {
  return (
    <>
      <Navbar />
      <div
        style={{
          paddingTop: "10vh",
        }}
      ></div>
      <div className="welcome-container">
        <div className="first-sec">
          <span>easy accounting for your business</span>
          <span>
            Papers Accounting Software for Business Owners and Accountants
          </span>
          <span>
            Track your expenses, manage inventories, customize invoices,
            generate business reports and so much more...
          </span>
          <Link to={"/SignUp"} className="get-started">
            Get Started
          </Link>
        </div>
        <div id="service" className="second-sec">
          <h2>Services</h2>
          <div className="service-img-container">
            <img src={Demo} alt="" />
            <span>
              The preparation of financial statements and periodic reports can
              be really exhausting and somewhat boring. That is why you need an
              accounting system to get your job done in limited time and also
              enjoy numerous benefits. Here at Papers, we will help you manage
              your business's finances, and help you gain financial freedom.
            </span>
          </div>
        </div>
        <div id="features" className="features">
          <h2>Features</h2>
          <div className="papers-features">
            <div>
              <img src={BookKeeping} alt="" />
              <span>
                Record your financial transactions such as expenses income and
                sales and automate accounting processes
              </span>
            </div>
            <div>
              <img src={BookKeeping} alt="" />
              <span>
                Create and send invoices to client and customers electronically,
                craft professional invoices instantly, automate payment
                reminders and ensure on-time payment
              </span>
            </div>
            <div>
              <img src={BookKeeping} alt="" />
              <span>
                Gain control of your business expenses, track business expenses,
                including receipts and bills
              </span>
            </div>
            <div>
              <img src={BookKeeping} alt="" />
              <span>
                Track inventory levels, monitor stock movements, and manage
                restocking points
              </span>
            </div>
            <div>
              <img src={BookKeeping} alt="" />
              <span>End-to-end transacting solutions for your businesses</span>
            </div>
            <div>
              <img src={BookKeeping} alt="" />
              <span>
                Generate financial reports such as income statements, balance
                sheets, etc for your business
              </span>
            </div>
          </div>
        </div>
        <div id="contact">
          <div class="container">
            <h2>Contact Us</h2>
            <form id="contact-form">
              <div class="form-group">
                <label class="label" for="name">
                  Name:
                </label>
                <input
                  class="input-field"
                  type="text"
                  id="name"
                  name="name"
                  required
                />
              </div>
              <div class="form-group">
                <label class="label" for="email">
                  Email:
                </label>
                <input
                  class="input-field"
                  type="email"
                  id="email"
                  name="email"
                  required
                />
              </div>
              <div class="form-group">
                <label class="label" for="message">
                  Message:
                </label>
                <textarea
                  class="input-field"
                  id="message"
                  name="message"
                  rows="4"
                  required
                ></textarea>
              </div>
              <button class="submit-button" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Welcome;
