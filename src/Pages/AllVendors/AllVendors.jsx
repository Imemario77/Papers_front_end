import React, { useEffect, useState } from "react";

import MainAppNavBar from "../../componets/MainAppNavBar/MainAppNavBar";
import Header from "../../componets/Header/Header";
import "./AllVendors.css";
import { deleteVendor, getAllVendor } from "../../api/api";
import AppModal from "../../componets/AppModal/Modal";
import ButtonAndLabel from "../../componets/AppButtonAndLabel/ButtonAndLabel";
import Vendor from "../../componets/AddVendor/Vendor";
import EditVendor from "../../componets/EditVendor/EditVendor";

function AllVendors({ expand, setExpand }) {
  const [addVendor, setAddVendor] = useState(false);
  const [editVendor, setEditVendor] = useState(false);
  const [editVendorInfo, setEditVendorInfo] = useState("");
  const [myVendors, setMyVendors] = useState([]);
  useEffect(() => {
    async function vendors() {
      await getAllVendor()
        .then((result) => {
          setMyVendors(result.data.result);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    vendors();
  }, [addVendor]);
  const handleRemoveVendor = async (email) => {
    await deleteVendor(email)
      .then((result) => {
        setMyVendors(result.data.result);
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
          <div className="all-vendor-holder">
            <div className="vendor-heading">
              <h2>vendors</h2>
              <ButtonAndLabel
                open1={() => setAddVendor(true)}
                button1={"+ Add Vendor"}
              />
            </div>
            {myVendors.map((vendor, index) => {
              return (
                <div key={index} className="each-vendor">
                  <div className="vendor-info">
                    <span>{vendor.name}</span>
                    <span>{vendor.email}</span>
                    <span>{vendor.number}</span>
                    <span>{vendor.address}</span>
                  </div>
                  <div className="vendor-actions">
                    <button
                      onClick={() => {
                        setEditVendorInfo(vendor);
                        setEditVendor(true);
                      }}
                      title="Edit vendor details"
                    >
                      <span className="fa fa-pencil"></span>
                    </button>
                    <button
                      onClick={() => handleRemoveVendor(vendor.email)}
                      title="remove vendor from your business"
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
      {addVendor && (
        <AppModal close={() => setAddVendor(false)}>
          <Vendor opened={(data) => setAddVendor(data)} />
        </AppModal>
      )}
      {editVendor && (
        <AppModal close={() => setEditVendor(false)}>
          <EditVendor
            vendorInfo={editVendorInfo}
            opened={(data) => setEditVendor(data)}
            updatedResult={(data) => setMyVendors(data)}
          />
        </AppModal>
      )}
    </div>
  );
}

export default AllVendors;
