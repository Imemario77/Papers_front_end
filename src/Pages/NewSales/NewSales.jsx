import React, { useEffect, useState } from "react";

import MainAppNavBar from "../../componets/MainAppNavBar/MainAppNavBar";
import Header from "../../componets/Header/Header";
import "./NewSales.css";
import { BiTrash } from "react-icons/bi";
import { createSales, getAllCustomer, getAllProducts } from "../../api/api";
import { useNavigate } from "react-router-dom";

function NewSales({ expand, setExpand }) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [myCustomers, setMyCustomers] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [saleDate, setSaleDate] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState({
    index: 0,
    msg: "",
  });
  const [itemsQuantity, setItemsQuantity] = useState([
    {
      index: 0,
      name: "",
      unitAmount: "",
      totalAmount: "",
      quantity: 1,
    },
  ]);

  const handleDeleteItem = (index) => {
    const updatedItem = itemsQuantity.filter((item) => {
      setTotalPrice((prev) => parseFloat(prev) - parseFloat(item.totalAmount));
      return item.index != index;
    });
    setItemsQuantity(updatedItem);
  };

  useEffect(() => {
    return () => {
      let sum = 0;
      itemsQuantity.forEach((item) => {
        item.totalAmount ? (sum += item.totalAmount) : null;
      });
      setTotalPrice(sum);
    };
  });

  useEffect(() => {
    async function customers() {
      await getAllCustomer()
        .then((result) => {
          setMyCustomers(result.data.result);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    customers();
  }, []);

  useEffect(() => {
    async function getProduct() {
      const result = await getAllProducts();
      setAllProducts(result.data.result);
    }
    getProduct();
  }, []);

  const handleSubmitAndSave = async () => {
    if (!selectedCustomer) {
      return setError({
        index: "customer",
        msg: "The customer field should not be empty",
      });
    }
    if (!saleDate) {
      return setError({
        index: "date",
        msg: "The date field should not be empty",
      });
    }

    itemsQuantity.map((item, index) => {
      if (!item.name) {
        return setError({
          index,
          place: "name",
          msg: "The name field should not be empty",
        });
      }
      if (!item.unitAmount) {
        return setError({
          index,
          place: "unitAmount",
          msg: "The unit amount field should not be empty",
        });
      }
      if (!item.quantity) {
        return setError({
          index,
          place: "quantity",
          msg: "The quantity field should not be empty",
        });
      }
      if (!item.totalAmount) {
        return setError({
          index,
          place: "total",
          msg: "The total amount field should not be empty",
        });
      }
    });

    const salesData = {
      saleDate,
      totalSum: totalPrice,
      customerId: selectedCustomer,
      allProducts: itemsQuantity,
    };
    await createSales(salesData)
      .then((result) => {
        return navigate("/Sales");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div style={{ position: "relative" }}>
      <div className="dashboard">
        <MainAppNavBar expand={expand} setExpand={setExpand} />
        <div className="content">
          <Header setExpand={setExpand} />
          <div className="new-sales-holder">
            <div className="sales-heading">
              <h2>New Sales</h2>
            </div>
            <div className="new-sales-container">
              <div className="new-sales-resister-heading">
                <div className="display-row">
                  <div>
                    <label htmlFor="date">
                      <b>Date</b>
                    </label>
                    <input
                      className={
                        error && error.index === "date" && "border-error"
                      }
                      onChange={(event) => {
                        error && error.index === "date" && setError({});
                        setSaleDate(event.target.value);
                      }}
                      type="date"
                      value={saleDate}
                    />
                    {error && error.index === "date" && (
                      <div className="error-msg s-16">{error.msg}</div>
                    )}
                  </div>
                  <div>
                    <label htmlFor="customer">
                      <b>Customer</b>
                    </label>
                    <select
                      className={
                        error && error.index === "customer" && "border-error"
                      }
                      name="customer"
                      onChange={(event) => {
                        error && error.index === "customer" && setError({});
                        setSelectedCustomer(event.target.value);
                      }}
                      value={selectedCustomer}
                    >
                      <option className="display-option" value="">
                        select customer
                      </option>
                      {myCustomers.map((customer, index) => {
                        return (
                          <option
                            key={index}
                            className="display-option"
                            value={
                              customer._id + "CustomerName" + customer.name
                            }
                          >
                            {customer.name}
                          </option>
                        );
                      })}
                    </select>
                    {error && error.index === "customer" && (
                      <div className="error-msg s-16">{error.msg}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="add-sales-product">
                <div className="display-app-sale-product">
                  <table>
                    <thead>
                      <tr>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Amount</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {itemsQuantity.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              <select
                                className={
                                  error &&
                                  error.index === index &&
                                  error.place === "name" &&
                                  "border-error"
                                }
                                onChange={(event) => {
                                  error &&
                                    error.index === index &&
                                    error.place === "name" &&
                                    setError({});
                                  setItemsQuantity((prev) => {
                                    prev[index].name = event.target.value;
                                    return [...prev];
                                  });
                                }}
                                name="products"
                                id=""
                              >
                                <option className="display-option" value="">
                                  select product
                                </option>
                                {allProducts.map((product, index) => {
                                  return (
                                    <option
                                      key={index}
                                      className="display-option"
                                      value={
                                        product.name +
                                        "ProductID" +
                                        product._id +
                                        "ProductID" +
                                        product.quantity
                                      }
                                    >
                                      {product.name}
                                    </option>
                                  );
                                })}
                              </select>{" "}
                              {error &&
                                error.index === index &&
                                error.place === "name" && (
                                  <div className="error-msg s-16">
                                    {error.msg}
                                  </div>
                                )}
                            </td>
                            <td>
                              <input
                                className={
                                  error &&
                                  error.index === index &&
                                  error.place === "quantity" &&
                                  "border-error"
                                }
                                value={item.quantity}
                                onChange={(event) => {
                                  error &&
                                    error.index === index &&
                                    error.place === "quantity" &&
                                    setError({});

                                  setItemsQuantity((prev) => {
                                    if (
                                      event.target.value === "" ||
                                      event.target.value === null
                                    ) {
                                      prev[index].quantity = "";
                                    } else if (parseInt(event.target.value) < 0)
                                      prev[index].quantity = 1;
                                    else if (
                                      parseInt(event.target.value) <
                                      parseInt(
                                        itemsQuantity[index].name.split(
                                          "ProductID"
                                        )[2]
                                      )
                                    )
                                      prev[index].quantity = event.target.value;
                                    else {
                                      prev[index].quantity =
                                        itemsQuantity[index].name.split(
                                          "ProductID"
                                        )[2];
                                    }
                                    prev[index].totalAmount =
                                      prev[index].unitAmount *
                                      prev[index].quantity;

                                    return [...prev];
                                  });
                                }}
                                type="number"
                                placeholder="Product Quantity"
                              />
                              {error &&
                                error.index === index &&
                                error.place === "quantity" && (
                                  <div className="error-msg s-16">
                                    {error.msg}
                                  </div>
                                )}
                            </td>
                            <td>
                              <input
                                className={
                                  error &&
                                  error.index === index &&
                                  error.place === "unitAmount" &&
                                  "border-error"
                                }
                                value={item.unitAmount}
                                onChange={(event) => {
                                  error &&
                                    error.index === index &&
                                    error.place === "unitAmount" &&
                                    setError({});
                                  setItemsQuantity((prev) => {
                                    prev[index].unitAmount = event.target.value;
                                    prev[index].totalAmount =
                                      prev[index].unitAmount *
                                      prev[index].quantity;
                                    return [...prev];
                                  });
                                }}
                                type="number"
                                placeholder="Product price"
                              />{" "}
                              {error &&
                                error.index === index &&
                                error.place === "unitAmount" && (
                                  <div className="error-msg s-16">
                                    {error.msg}
                                  </div>
                                )}
                            </td>
                            <td>
                              <input
                                className={
                                  error &&
                                  error.index === index &&
                                  error.place === "total" &&
                                  "border-error"
                                }
                                value={item.totalAmount}
                                onChange={() => {
                                  error &&
                                    error.index === index &&
                                    error.place === "total" &&
                                    setError({});
                                  setItemsQuantity((prev) => {
                                    prev[index].totalAmount =
                                      itemsQuantity[index].quantity *
                                      itemsQuantity[index].unitAmount;
                                    return [...prev];
                                  });
                                }}
                                type="number"
                                placeholder="Total Amount"
                              />{" "}
                              {error &&
                                error.index === index &&
                                error.place === "total" && (
                                  <div className="error-msg s-16">
                                    {error.msg}
                                  </div>
                                )}
                            </td>
                            <td>
                              <button
                                title="delete item"
                                onClick={() => {
                                  handleDeleteItem(item.index);
                                }}
                              >
                                <BiTrash />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <button
                    onClick={() => {
                      setItemsQuantity((prev) => {
                        console.log(prev);
                        return [
                          ...prev,
                          {
                            index: prev[prev.length - 1]
                              ? prev[prev.length - 1].index + 1
                              : 0,
                            name: "",
                            unitAmount: "",
                            totalAmount: "",
                            quantity: 1,
                          },
                        ];
                      });
                    }}
                    className="new-item-btn"
                  >
                    + New Item
                  </button>
                </div>
              </div>
              <div className="total-sum-div">
                <span>
                  <b>TOTAL: </b>
                  <p>
                    <b>NGN </b>
                    {totalPrice}
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

export default NewSales;
