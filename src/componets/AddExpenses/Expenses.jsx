import React, { useEffect, useState } from "react";

import "./Expenses.css";
import { addExpenses, getAllProducts, getAllVendor } from "../../api/api";

function Expenses(props) {
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [otherCategory, setOtherCategory] = useState("");
  const [vendor, setVendor] = useState("");
  const [allVendor, setAllVendor] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [amount, setAmount] = useState("");
  const [remarks, setRemarks] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function getVendors() {
      const result = await getAllVendor();
      setAllVendor(result.data.result);
    }
    getVendors();
  }, []);

  useEffect(() => {
    async function getProduct() {
      const result = await getAllProducts();
      setAllProducts(result.data.result);
    }
    getProduct();
  }, []);

  const AddExpenses = async (e) => {
    e.preventDefault();
    await addExpenses({
      amount,
      date,
      vendor,
      remarks,
      category: category === "others" ? otherCategory : category,
    })
      .then((result) => {
        if (result) {
          props.opened(false);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error) setError(error.response.data.message);
      });
  };

  return (
    <div className="Expenses-container">
      {error && <p className="error-msg s-16">{error}</p>}
      <h3>Add Expenses</h3>

      <div className="acct-choice new-acct">
        <div className="display-row">
          <div>
            <label htmlFor="date">Date</label>
            <input
              onChange={(e) => setDate(e.target.value)}
              type="date"
              value={date}
            />
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              name="category"
              id=""
            >
              <option className="display-option" value="">
                select category
              </option>
              {allProducts.map((product, index) => {
                return (
                  <option
                    key={index}
                    className="display-option"
                    value={product.name}
                  >
                    {product.name}
                  </option>
                );
              })}
              <option className="display-option" value="others">
                others
              </option>
            </select>
          </div>
        </div>
        {category === "others" && (
          <div className="display-row">
            <div>
              <label htmlFor="others">others</label>
              <input
                style={{ width: "100%" }}
                onChange={(e) => setOtherCategory(e.target.value)}
                type="text"
                value={otherCategory}
                name="others"
                maxLength={30}
              />
            </div>
          </div>
        )}
        <div className="display-row">
          <div>
            <label htmlFor="vendor">Vendor</label>
            <select
              onChange={(e) => setVendor(e.target.value)}
              value={vendor}
              name="vendor"
            >
              <option className="display-option" value="">
                select vendor
              </option>
              {allVendor.map((vendor, index) => {
                return (
                  <option
                    key={index}
                    className="display-option"
                    value={vendor.name}
                  >
                    {vendor.name}
                  </option>
                );
              })}
              <option className="display-option" value="others">
                others
              </option>
            </select>
          </div>
          <div>
            <label htmlFor="amount">Amount NGN</label>
            <input
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              placeholder="NGN Amount"
              value={amount}
            />
          </div>
        </div>
        <label htmlFor="remarks">Remarks</label>
        <textarea
          onChange={(e) => setRemarks(e.target.value)}
          type="text"
          placeholder="remarks"
          value={remarks}
        />

        <button onClick={AddExpenses} className="send-Expenses-choice">
          Send
        </button>
      </div>
    </div>
  );
}

export default Expenses;
