import React, { useState, useEffect } from "react";
import { PiBasketFill } from "react-icons/pi";
import { IoCloseSharp } from "react-icons/io5";
import { AiOutlineStock } from "react-icons/ai";
import { FaUserPlus } from "react-icons/fa";
import { ResponsiveContainer } from "recharts";

import MainAppNavBar from "../../componets/MainAppNavBar/MainAppNavBar";
import "./Dashboard.css";
import Header from "../../componets/Header/Header";
import AppModal from "../../componets/AppModal/Modal";
import Staff from "../../componets/AddStaff/Staff";
import AddProduct from "../../componets/AddProduct/AddProduct";
import DeleteProduct from "../../componets/DeleteProduct/DeleteProduct";
import Customer from "../../componets/addCustomer/Customer";
import RestockProduct from "../../componets/RestockProduct/RestocKProduct";
import {
  getExpensesChartData,
  getExpensesDashBoardAmount,
  getOverDuedInvoiceAmount,
  getSalesDashBoardAmount,
} from "../../api/api";
import AppBarChart from "../../componets/Chart/AppBarChart";
import ButtonAndLabel from "../../componets/AppButtonAndLabel/ButtonAndLabel";

function Dashboard({ expand, setExpand }) {
  const [changeChartDetails, setChangeChartDetails] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [fetChartDetailsDays, setFetChartDetailsDays] = useState(7);
  const [addStaff, setAddStaff] = useState(false);
  const [addVendor, setAddVendor] = useState(false);
  const [addProduct, setAddProduct] = useState(false);
  const [restock, setRestock] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState(false);
  const [expensesAmount, setExpensesAmount] = useState("0.00");
  const [salesAmount, setSalesAmount] = useState("0.00");
  const [overDueAmount, setOverDueAmount] = useState("0.00");

  useEffect(() => {
    async function getExpensesDetails() {
      await getExpensesDashBoardAmount(fetChartDetailsDays)
        .then((result) => {
          if (Number.isInteger(result.data.result))
            setExpensesAmount(result.data.result.toString() + ".00");
          else {
            let float_number = result.data.result.toString().split(".");
            let first_number = float_number[0];
            let second_number = float_number[1];
            if (second_number.length >= 2)
              setExpensesAmount(
                first_number.toString() +
                  "." +
                  second_number[0].toString() +
                  second_number[1].toString()
              );
            else setExpensesAmount(result.data.result.toString() + "0");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    getExpensesDetails();
  }, [fetChartDetailsDays]);

  useEffect(() => {
    async function getSalesDetails() {
      await getSalesDashBoardAmount(fetChartDetailsDays)
        .then((result) => {
          if (Number.isInteger(result.data.result))
            setSalesAmount(result.data.result.toString() + ".00");
          else {
            let float_number = result.data.result.toString().split(".");
            let first_number = float_number[0];
            let second_number = float_number[1];
            if (second_number.length >= 2)
              setSalesAmount(
                first_number.toString() +
                  "." +
                  second_number[0].toString() +
                  second_number[1].toString()
              );
            else setSalesAmount(result.data.result.toString() + "0");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getSalesDetails();
  }, [fetChartDetailsDays]);

  useEffect(() => {
    const fetchData = async () => {
      await getExpensesChartData(fetChartDetailsDays)
        .then((result) => {
          setChartData(result.data.result);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, [fetChartDetailsDays]);

  useEffect(() => {
    async function getOverDueDetails() {
      await getOverDuedInvoiceAmount(fetChartDetailsDays)
        .then((result) => {
          if (Number.isInteger(result.data.result))
            setOverDueAmount(result.data.result.toString() + ".00");
          else {
            let float_number = result.data.result.toString().split(".");
            let first_number = float_number[0];
            let second_number = float_number[1];
            if (second_number.length >= 2)
              setOverDueAmount(
                first_number.toString() +
                  "." +
                  second_number[0].toString() +
                  second_number[1].toString()
              );
            else setOverDueAmount(result.data.result.toString() + "0");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getOverDueDetails();
  }, [fetChartDetailsDays]);

  const handleClick = (days) => {
    setFetChartDetailsDays(days);
    setChangeChartDetails(false);
  };
  return (
    <div style={{ position: "relative" }}>
      <div className="dashboard">
        <MainAppNavBar expand={expand} setExpand={setExpand} />
        <div className="content">
          <Header setExpand={setExpand} />
          <div className="cards">
            <div className="card">
              <h2>NGN {salesAmount}</h2>
              <p className="revenue">Revenue</p>
            </div>
            <div className="card">
              <h2>NGN {expensesAmount}</h2>
              <p className="expenses">Expenses</p>
            </div>
            <div className="card">
              <h2>NGN {overDueAmount}</h2>
              <p className="outstanding">Outstanding</p>
            </div>
          </div>
          <div className="responsive-chart">
            {/* <ResponsiveContainer width="100%" height="100%"> */}
            <div className="app-chart-holder">
              <div>
                <span>Revenue & Expenses</span>
                <button onClick={() => setChangeChartDetails((prev) => !prev)}>
                  Select Period
                </button>
                {changeChartDetails && (
                  <div className="select-period-holder">
                    <span></span>
                    <span onClick={() => handleClick(7)}>7 days</span>
                    <span onClick={() => handleClick(30)}>30 days</span>
                    <span onClick={() => handleClick(90)}>90 days</span>
                    <span onClick={() => handleClick(365)}>1 year</span>
                  </div>
                )}
              </div>
              <div>
                <AppBarChart data={chartData} />
              </div>
            </div>
            {/* </ResponsiveContainer> */}
            <div className="dashboard-widgets-container">
              <div
                onClick={() => setAddProduct(true)}
                className="dashboard-widgets"
              >
                <PiBasketFill />
                <span>Add Products</span>
              </div>
              <div
                onClick={() => setDeleteProduct(true)}
                className="dashboard-widgets"
              >
                <IoCloseSharp />
                <span>Remove Products</span>
              </div>
              <div
                onClick={() => setRestock(true)}
                className="dashboard-widgets"
              >
                <AiOutlineStock />
                <span>Restock</span>
              </div>
              <div
                onClick={() => setAddVendor(true)}
                className="dashboard-widgets"
              >
                <FaUserPlus />
                <span>Add Customer</span>
              </div>
              <div
                onClick={() => setAddStaff(true)}
                className="dashboard-widgets"
              >
                <FaUserPlus />
                <span>Add Staff</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {addStaff && (
        <AppModal close={() => setAddStaff(false)}>
          <Staff opened={(data) => setAddStaff(data)} />
        </AppModal>
      )}
      {addProduct && (
        <AppModal close={() => setAddProduct(false)}>
          <AddProduct opened={(data) => setAddProduct(data)} />
        </AppModal>
      )}
      {deleteProduct && (
        <AppModal close={() => setDeleteProduct(false)}>
          <DeleteProduct opened={(data) => setDeleteProduct(data)} />
        </AppModal>
      )}
      {addVendor && (
        <AppModal close={() => setAddVendor(false)}>
          <Customer opened={(data) => setAddVendor(data)} />
        </AppModal>
      )}
      {restock && (
        <AppModal close={() => setRestock(false)}>
          <RestockProduct opened={(data) => setRestock(data)} />
        </AppModal>
      )}
    </div>
  );
}

export default Dashboard;
