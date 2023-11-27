import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MainAppNavBar from "../../componets/MainAppNavBar/MainAppNavBar";
import Header from "../../componets/Header/Header";
import "./Sales.css";
import NoSales from "../../assets/welcome.png";
import { deleteOneSales, getBusinessSales } from "../../api/api";

function Sales({ expand, setExpand }) {
  const [allSales, setAllSales] = useState([]);
  useEffect(() => {
    async function getBusinessSalesInfo() {
      const result = await getBusinessSales();
      setAllSales(result.data.result);
    }

    getBusinessSalesInfo();
  }, []);

  const handleDelete = async (id) => {
    await deleteOneSales(id)
      .then((result) => {
        setAllSales(result.data.result);
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
          <div className="all-sales-holder">
            <div className="sales-heading">
              <h2>Sales</h2>
              <Link to={"/Sales/New"}>
                <button>+ Add Sales</button>
              </Link>
            </div>
            {allSales.length === 0 ? (
              <div className="no-expenses">
                <img src={NoSales} alt="" />
                <span>Track and manage your business expenses with ease.</span>
              </div>
            ) : (
              <div className="expenses-details span-100">
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
                    {allSales.map((sale, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{sale.customerName}</td>
                          <td>{sale.productQuantity}</td>
                          <td>NGN {sale.amount}</td>
                          <td>{sale.saleDate.split("T")[0]}</td>
                          <td>
                            {!sale.invoiced && (
                              <Link to={"/Invoice/New/" + sale._id}>
                                <button title="create invoice">
                                  <span className="fa fa-plus"></span>
                                </button>
                              </Link>
                            )}
                            {sale.invoiced && (
                              <Link to={"/Invoice/View/" + sale._id}>
                                <button title="view sales">
                                  <span className="fa fa-eye"></span>
                                </button>
                              </Link>
                            )}
                            <button
                              onClick={() => handleDelete(sale._id)}
                              title="delete sales"
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
    </div>
  );
}

export default Sales;
