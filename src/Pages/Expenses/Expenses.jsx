import React, { useState, useEffect } from "react";

import "./Expenses.css";
import MainAppNavBar from "../../componets/MainAppNavBar/MainAppNavBar";
import Header from "../../componets/Header/Header";
import NoExpenses from "../../assets/welcome.png";
import ButtonAndLabel from "../../componets/AppButtonAndLabel/ButtonAndLabel";
import AppModal from "../../componets/AppModal/Modal";
import Vendor from "../../componets/AddVendor/Vendor";
import ExpensesModel from "../../componets/AddExpenses/Expenses.jsx";
import { deleteExpenses, getAllExpenses } from "../../api/api";
import { Link } from "react-router-dom";

function Expenses({ expand, setExpand }) {
  const [addVendor, setAddVendor] = useState(false);
  const [addExpenses, setAddExpenses] = useState(false);
  const [allExpenses, setAllExpenses] = useState([]);
  useEffect(() => {
    async function getBusinessExpenses() {
      const result = await getAllExpenses();
      setAllExpenses(result.data.result);
    }

    getBusinessExpenses();
  }, [addExpenses]);

  const handleDelete = async (id) => {
    await deleteExpenses(id)
      .then((result) => {
        setAllExpenses(result.data.result);
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
          <div className="expenses-container">
            <ButtonAndLabel
              button1={"+ Add Expenses"}
              button2={"+ Add Vendor"}
              open1={() => setAddExpenses(true)}
              open2={() => setAddVendor(true)}
              label={"Expenses"}
            />
            {allExpenses.length === 0 ? (
              <div className="no-expenses">
                <img src={NoExpenses} alt="" />
                <span>Track and manage your business expenses with ease.</span>
                <button onClick={() => setAddExpenses(true)}>
                  + Add Expenses
                </button>
              </div>
            ) : (
              <div className="expenses-details">
                <table>
                  <thead>
                    <tr>
                      <th>S/N</th>
                      <th>Vendor</th>
                      <th>category</th>
                      <th>amount</th>
                      <th>date</th>
                      <th>actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allExpenses.map((expense, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{expense.vendor}</td>
                          <td>{expense.category}</td>
                          <td>NGN {expense.amount}</td>
                          <td>{expense.date.split("T")[0]}</td>
                          <td>
                            <Link to={"/Expenses/" + expense._id}>
                              <button title="view expenses">
                                <span className="fa fa-folder-open-o"></span>
                              </button>
                            </Link>
                            <button
                              onClick={() => handleDelete(expense._id)}
                              title="delete expenses"
                            >
                              <span className="fa fa-trash-o"></span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
      {addVendor && (
        <AppModal close={() => setAddVendor(false)}>
          <Vendor opened={(data) => setAddVendor(data)} />
        </AppModal>
      )}
      {addExpenses && (
        <AppModal close={() => setAddExpenses(false)}>
          <ExpensesModel opened={(data) => setAddExpenses(data)} />
        </AppModal>
      )}
    </div>
  );
}

export default Expenses;
