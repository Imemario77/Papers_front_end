import React, { useEffect, useState } from "react";

import MainAppNavBar from "../../componets/MainAppNavBar/MainAppNavBar";
import Header from "../../componets/Header/Header";
import "./AllCustomers.css";
import { deleteCustomer, getAllCustomer } from "../../api/api";
import AppModal from "../../componets/AppModal/Modal";
import ButtonAndLabel from "../../componets/AppButtonAndLabel/ButtonAndLabel";
import Customer from "../../componets/addCustomer/Customer";
import EditCustomer from "../../componets/EditCustomer/EditCustomer";

function AllCustomers({ expand, setExpand }) {
  const [addCustomer, setAddCustomer] = useState(false);
  const [editCustomer, setEditCustomer] = useState(false);
  const [editCustomerInfo, setEditCustomerInfo] = useState("");
  const [myCustomers, setMyCustomers] = useState([]);

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
  }, [addCustomer]);

  const handleRemoveCustomer = async (email) => {
    await deleteCustomer(email)
      .then((result) => {
        setMyCustomers(result.data.result);
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
          <div className="all-customer-holder">
            <div className="customer-heading">
              <h2>customers</h2>
              <ButtonAndLabel
                open1={() => setAddCustomer(true)}
                button1={"+ Add Customer"}
              />
            </div>
            {myCustomers.map((customer, index) => {
              return (
                <div key={index} className="each-customer">
                  <div className="customer-info">
                    <span>{customer.name}</span>
                    <span>{customer.email}</span>
                    <span>{customer.number}</span>
                    <span>{customer.address}</span>
                  </div>
                  <div className="customer-actions">
                    <button
                      onClick={() => {
                        setEditCustomerInfo(customer);
                        setEditCustomer(true);
                      }}
                      title="Edit customer details"
                    >
                      <span className="fa fa-pencil"></span>
                    </button>
                    <button
                      onClick={() => handleRemoveCustomer(customer.email)}
                      title="remove customer from your business"
                    >
                      <span className="fa fa-trash-o"></span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>{" "}
      {addCustomer && (
        <AppModal close={() => setAddCustomer(false)}>
          <Customer opened={(data) => setAddCustomer(data)} />
        </AppModal>
      )}{" "}
      {editCustomer && (
        <AppModal close={() => setEditCustomer(false)}>
          <EditCustomer
            customerInfo={editCustomerInfo}
            opened={(data) => setEditCustomer(data)}
            updatedResult={(data) => setMyCustomers(data)}
          />
        </AppModal>
      )}
    </div>
  );
}

export default AllCustomers;
