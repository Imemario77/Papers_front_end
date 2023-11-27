import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import "./Expenses.css";
import MainAppNavBar from "../../componets/MainAppNavBar/MainAppNavBar";
import Header from "../../componets/Header/Header";
import "./SingleExpenses.css";
import { deleteExpenses, getOneExpenses } from "../../api/api";

function SingleExpenses({ expand, setExpand }) {
  const expensesID = useLocation().pathname.split("/")[2];

  const [expenses, seetExpenses] = useState(null);

  useEffect(() => {
    async function loadCurrentExpenses() {
      const result = await getOneExpenses(expensesID);
      seetExpenses(result.data.result);
      console.log(result);
    }
    loadCurrentExpenses();
  }, [expensesID]);
  const handleDelete = async (id) => {
    await deleteExpenses(id)
      .then((result) => {
        window.location = "/Expenses";
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.message);
      });
  };

  return (
    <div style={{ position: "relative" }}>
      <div className="dashboard">
        <MainAppNavBar expand={expand} setExpand={setExpand} />
        <div className="content">
          <Header setExpand={setExpand} />
          <div className="s-expenses-container-holder">
            <div className="s-expenses-container">
              <div className="s-expenses-heading">
                <span>expenses details</span>
              </div>
              <div className="s-expenses-body">
                <div className="category-value">
                  <span>Category</span>
                  <span>{expenses && expenses.category}</span>
                </div>
                <div className="category-value">
                  <span>Amount</span>
                  <span>NGN {expenses && expenses.amount}</span>
                </div>
                <div className="category-value">
                  <span>Vendor</span>
                  <span>{expenses && expenses.vendor}</span>
                </div>
                <div className="category-value">
                  <span>Date</span>
                  <span>{expenses && expenses.date.split("T")[0]}</span>
                </div>
                <div className="category-value">
                  <span>Remarks</span>
                  <span>{expenses && expenses.remarks}</span>
                </div>
              </div>
              <div className="s-expenses-feet">
                <div>
                  <span onClick={() => handleDelete(expenses._id)}>
                    Delete Expenses
                  </span>
                  <span>Edit Expenses</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleExpenses;
