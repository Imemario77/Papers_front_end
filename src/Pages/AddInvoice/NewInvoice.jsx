import React, { useEffect, useState } from "react";

import MainAppNavBar from "../../componets/MainAppNavBar/MainAppNavBar";
import Header from "../../componets/Header/Header";
import "./NewInvoice.css";
import { createInvoice, getOneSales } from "../../api/api";
import { useLocation, useNavigate } from "react-router-dom";

function NewInvoice({ expand, setExpand }) {
  const location = useLocation();
  const navigate = useNavigate();
  const salesID = location.pathname.split("/")[3];
  const [itemsQuantity, setItemsQuantity] = useState([]);
  const [remarks, setRemarks] = useState("");
  const [status, setStatus] = useState("");
  const [logo, setLogo] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [salesInfo, setSalesInfo] = useState({
    saleDate: "",
  });

  useEffect(() => {
    return async () => {
      await getOneSales(salesID)
        .then((result) => {
          setSalesInfo(result.data.result_A);
          setItemsQuantity(result.data.result_B);
        })
        .catch((error) => {
          console.log(error);
        });
    };
  }, []);

  const handleSubmitAndSave = async () => {
    const invoiceData = {
      remarks,
      dueDate,
      salesId: salesID,
      status,
      logo,
    };
    await createInvoice(invoiceData)
      .then((result) => {
        return navigate("/Invoice");
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.message);
        if (error.response.data.message === "this sales already has an invoice")
          return navigate("/Invoice");
      });
  };

  return (
    <div style={{ position: "relative" }}>
      <div className="dashboard">
        <MainAppNavBar expand={expand} setExpand={setExpand} />
        <div className="content">
          <Header setExpand={setExpand} />
          <div className="new-invoice-holder">
            <div className="invoice-heading">
              <h2>New Invoice</h2>
            </div>
            <div className="new-invoice-container">
              <div className="new-invoice-resister-heading">
                <div className="display-row">
                  <div>
                    <label htmlFor="date">
                      <b>SALES DATE</b>
                    </label>
                    <input
                      disabled
                      type="date"
                      value={salesInfo.saleDate.split("T")[0]}
                    />
                  </div>
                  <div>
                    <label htmlFor="customer">
                      <b>CUSTOMER</b>
                    </label>
                    <input
                      disabled
                      type="text"
                      value={salesInfo.customerName}
                    />
                  </div>
                  <div>
                    <label htmlFor="customer">
                      <b>DUE DATE</b>
                    </label>
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(event) => setDueDate(event.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="customer">
                      <b>STATUS</b>
                    </label>
                    <select
                      onChange={(e) => setStatus(e.target.value)}
                      value={status}
                    >
                      <option value="">Payment Status</option>
                      <option value="Not Paid">Not Paid</option>
                      <option value="Paid">Paid</option>
                    </select>
                  </div>
                </div>
              </div>{" "}
              <div className="remarks-box-holder">
                <label htmlFor="remarks">Remarks</label>
                <textarea
                  name="remarks"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  cols="30"
                  rows="10"
                ></textarea>
              </div>
              <div className="add-invoice-product">
                <div className="display-app-sale-product">
                  <table>
                    <thead>
                      <tr>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {itemsQuantity &&
                        itemsQuantity.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                <input
                                  disabled
                                  type="text"
                                  placeholder="Product Name"
                                  value={item.productName}
                                />
                              </td>
                              <td>
                                <input
                                  disabled
                                  type="number"
                                  placeholder="Product Quantity"
                                  value={item.quantity}
                                />
                              </td>
                              <td>
                                <input
                                  disabled
                                  type="number"
                                  placeholder="Product price"
                                  value={item.unitAmount}
                                />
                              </td>
                              <td>
                                <input
                                  disabled
                                  type="number"
                                  placeholder="Total Amount"
                                  value={item.totalAmount}
                                />
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="total-sum-div">
                <span>
                  <b>TOTAL: </b>
                  <p>
                    <b>NGN </b>
                    {salesInfo.amount}
                  </p>
                </span>
              </div>
              <button
                onClick={handleSubmitAndSave}
                className="save-and-continue"
              >
                Save and Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewInvoice;
