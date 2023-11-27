import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import "./App.css";
import Login from "./Pages/CreateAccount/Login";
import SignUp from "./Pages/CreateAccount/SignUp";
import RegisterBusiness from "./Pages/GetStarted/RegisterBusiness";
import Welcome from "./Pages/Welcome/Welcome";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Expenses from "./Pages/Expenses/Expenses";
import Invoice from "./Pages/Invoice/Invoice";
import Inventory from "./Pages/Inventory/Inventory";
import { getBusiness } from "./api/api";
import SingleExpenses from "./Pages/Expenses/SingleExpenses";
import AllStaffs from "./Pages/AllStaffs/AllStaffs";
import AllVendors from "./Pages/AllVendors/AllVendors";
import AllCustomers from "./Pages/AllCustomers/AllCustomers";
import Sales from "./Pages/Sales/Sales";
import NewSales from "./Pages/NewSales/NewSales";
import NewInvoice from "./Pages/AddInvoice/NewInvoice";
import Profile from "./Pages/Profile/Proflie";
import OTP from "./Pages/PassResetPage/OTP";
import PassWord from "./Pages/PassResetPage/PassWord";

function App() {
  const businessData = useSelector(
    (state) => state.businessReducer.businessData
  );
  const businessDataError = useSelector((state) => state.businessReducer.error);

  const [userBusiness, setUserBusiness] = useState(businessData || false);
  const [expand, setExpand] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.authData);
  const otpStatus = useSelector((state) => state.otpReducer.started);
  const passChange = useSelector((state) => state.otpReducer.change);

  useEffect(() => {
    async function getBusinessDetails() {
      dispatch({ type: "GET_BUSINESS_STARTED" });
      await getBusiness()
        .then((result) => {
          dispatch({
            type: "GET_BUSINESS_SUCCESS",
            payload: result.data.account,
          });
          setUserBusiness(true);
        })
        .catch((error) => {
          dispatch({ type: "GET_BUSINESS_FAILED" });
          console.log(error);
        });
    }

    getBusinessDetails();
  }, [user]);

  useEffect(() => {
    return () => {
      if (businessDataError) {
        dispatch({
          type: "GET_BUSINESS_SUCCESS",
          payload: null,
        });
        dispatch({ type: "AUTH_SUCCESS", payload: null });
      }
    };
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route
            path="/Login"
            element={
              user ? (
                <Navigate to={"/DashBoard"} />
              ) : otpStatus ? (
                <Navigate to={"/Otp"} />
              ) : passChange ? (
                <Navigate to={"/NewPassword"} />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/SignUp"
            element={
              user ? (
                <Navigate to={"/DashBoard"} />
              ) : otpStatus ? (
                <Navigate to={"/Otp"} />
              ) : passChange ? (
                <Navigate to={"/NewPassword"} />
              ) : (
                <SignUp />
              )
            }
          />
          <Route
            path="/DashBoard"
            element={
              !user ? (
                <Navigate to={"/Login"} />
              ) : !userBusiness ? (
                <Navigate to={"/RegisterBuisness"} />
              ) : (
                <Dashboard expand={expand} setExpand={setExpand} />
              )
            }
          />
          <Route
            path="/RegisterBuisness"
            element={
              !user ? (
                <Navigate to={"/Login"} />
              ) : userBusiness ? (
                <Navigate to={"/DashBoard"} />
              ) : (
                <RegisterBusiness />
              )
            }
          />
          <Route
            path="/Expenses"
            element={
              !user ? (
                <Navigate to={"/Login"} />
              ) : !userBusiness ? (
                <Navigate to={"/RegisterBuisness"} />
              ) : (
                <Expenses expand={expand} setExpand={setExpand} />
              )
            }
          />
          <Route
            path="/Expenses/:id"
            element={
              !user ? (
                <Navigate to={"/Login"} />
              ) : !userBusiness ? (
                <Navigate to={"/RegisterBuisness"} />
              ) : (
                <SingleExpenses expand={expand} setExpand={setExpand} />
              )
            }
          />
          <Route
            path="/Invoice"
            element={
              !user ? (
                <Navigate to={"/Login"} />
              ) : !userBusiness ? (
                <Navigate to={"/RegisterBuisness"} />
              ) : (
                <Invoice expand={expand} setExpand={setExpand} />
              )
            }
          />
          <Route
            path="/Inventory"
            element={
              !user ? (
                <Navigate to={"/Login"} />
              ) : !userBusiness ? (
                <Navigate to={"/RegisterBuisness"} />
              ) : (
                <Inventory expand={expand} setExpand={setExpand} />
              )
            }
          />
          <Route
            path="/AllStaffs"
            element={
              !user ? (
                <Navigate to={"/Login"} />
              ) : !userBusiness ? (
                <Navigate to={"/RegisterBuisness"} />
              ) : (
                <AllStaffs expand={expand} setExpand={setExpand} />
              )
            }
          />
          <Route
            path="/AllVendors"
            element={
              !user ? (
                <Navigate to={"/Login"} />
              ) : !userBusiness ? (
                <Navigate to={"/RegisterBuisness"} />
              ) : (
                <AllVendors expand={expand} setExpand={setExpand} />
              )
            }
          />
          <Route
            path="/AllCustomers"
            element={
              !user ? (
                <Navigate to={"/Login"} />
              ) : !userBusiness ? (
                <Navigate to={"/RegisterBuisness"} />
              ) : (
                <AllCustomers expand={expand} setExpand={setExpand} />
              )
            }
          />
          <Route
            path="/Sales"
            element={
              !user ? (
                <Navigate to={"/Login"} />
              ) : !userBusiness ? (
                <Navigate to={"/RegisterBuisness"} />
              ) : (
                <Sales expand={expand} setExpand={setExpand} />
              )
            }
          />
          <Route
            path="/Sales/New"
            element={
              !user ? (
                <Navigate to={"/Login"} />
              ) : !userBusiness ? (
                <Navigate to={"/RegisterBuisness"} />
              ) : (
                <NewSales expand={expand} setExpand={setExpand} />
              )
            }
          />
          <Route
            path="/Invoice/New/:salesID"
            element={
              !user ? (
                <Navigate to={"/Login"} />
              ) : !userBusiness ? (
                <Navigate to={"/RegisterBuisness"} />
              ) : (
                <NewInvoice expand={expand} setExpand={setExpand} />
              )
            }
          />
          <Route
            path="/Profile"
            element={
              !user ? (
                <Navigate to={"/Login"} />
              ) : !userBusiness ? (
                <Navigate to={"/RegisterBuisness"} />
              ) : (
                <Profile expand={expand} setExpand={setExpand} />
              )
            }
          />
          <Route
            path="/Otp"
            element={otpStatus ? <OTP /> : <Navigate to={"/Login"} />}
          />
          <Route
            path="/NewPassword"
            element={passChange ? <PassWord /> : <Navigate to={"/Login"} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
