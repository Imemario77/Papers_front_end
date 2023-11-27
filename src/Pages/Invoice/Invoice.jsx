import React, { useState, useEffect } from "react";

import "./Invoice.css";
import MainAppNavBar from "../../componets/MainAppNavBar/MainAppNavBar";
import Header from "../../componets/Header/Header";
import NoInvoices from "../../assets/welcome.png";
import ButtonAndLabel from "../../componets/AppButtonAndLabel/ButtonAndLabel";
import { deleteInvoice, getAllInvoice } from "../../api/api";

function Invoice({ expand, setExpand }) {
  const [allInvoices, setAllInvoices] = useState([]);

  useEffect(() => {
    async function getBusinessInvoices() {
      const result = await getAllInvoice();
      setAllInvoices(result.data.result);
    }

    getBusinessInvoices();
  }, []);

  const handleDelete = async (id) => {
    await deleteInvoice(id)
      .then((result) => {
        setAllInvoices(result.data.result);
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.message);
      });
  };

  return (
    <div className="dashboard">
      <MainAppNavBar expand={expand} setExpand={setExpand} />
      <div className="content">
        <Header setExpand={setExpand} />
        <div className="invoice-container">
          <ButtonAndLabel label={"Invoice"} />

          {allInvoices.length === 0 ? (
            <div className="no-expenses">
              <img src={NoInvoices} alt="" />
              <span>Track and manage your business customers with ease.</span>
              <button>+ Add Invoice</button>
            </div>
          ) : (
            <div className="invoice-details">
              <table>
                <thead>
                  <tr>
                    <th>No.#</th>
                    <th>Client</th>
                    <th>Due Date</th>
                    <th>amount</th>
                    <th>Status</th>
                    <th>actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allInvoices.map((invoice, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{invoice.customerName}</td>
                        <td>{invoice.dueDate.split("T")[0]}</td>
                        <td>NGN {invoice.amount}</td>
                        <td>
                          {invoice.status === "Paid" && (
                            <span className="paid">Paid</span>
                          )}
                          {invoice.status === "Not Paid" && (
                            <span className="draft">Draft</span>
                          )}
                        </td>
                        <td>
                          <button title="view invoice">
                            <span class="fa fa-pencil-square-o"></span>
                          </button>
                          <button
                            onClick={() => handleDelete(invoice._id)}
                            title="delete invoice"
                          >
                            <span class="fa fa-trash-o"></span>
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
  );
}

export default Invoice;
