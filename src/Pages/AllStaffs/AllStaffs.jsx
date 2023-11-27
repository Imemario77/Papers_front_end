import React, { useEffect, useState } from "react";

import MainAppNavBar from "../../componets/MainAppNavBar/MainAppNavBar";
import Header from "../../componets/Header/Header";
import "./AllStaffs.css";
import {
  getBusinessStaffs,
  removeUserFromBusiness,
  updateUserRole,
} from "../../api/api";
import AppModal from "../../componets/AppModal/Modal";
import ButtonAndLabel from "../../componets/AppButtonAndLabel/ButtonAndLabel";
import Staff from "../../componets/AddStaff/Staff";

function AllStaffs({ expand, setExpand }) {
  const [addStaff, setAddStaff] = useState(false);
  const [editStaff, setEditStaff] = useState(false);
  const [editStaffId, setEditStaffID] = useState("");
  const [editStaffRole, setEditStaffRole] = useState("accountant");
  const [myStaffs, setMyStaffs] = useState([]);
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    async function staffs() {
      await getBusinessStaffs()
        .then((result) => {
          setMyStaffs(result.data.result.staffs);
          setRoles(result.data.result.roles);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    staffs();
  }, [addStaff]);

  const handleRemoveUser = async (userId) => {
    await removeUserFromBusiness({ userId })
      .then((result) => {
        setMyStaffs(result.data.result.staffs);
        setRoles(result.data.result.roles);
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.message);
      });
  };

  const handleUpdateUserRole = async (userId) => {
    await updateUserRole({ userId, role: editStaffRole })
      .then((result) => {
        setRoles(result.data.result);
        setEditStaff(false);
      })
      .catch((error) => {
        console.log(error);
        setEditStaff(false);
        alert(error.response.data.message);
      });
  };

  return (
    <div style={{ position: "relative" }}>
      <div className="dashboard">
        <MainAppNavBar expand={expand} setExpand={setExpand} />
        <div className="content">
          <Header setExpand={setExpand} />
          <div className="all-staff-holder">
            <div className="vendor-heading">
              <h2>All Staffs</h2>
              <ButtonAndLabel
                open1={() => setAddStaff(true)}
                button1={"+ Add Staff"}
              />
            </div>
            {myStaffs.map((staff, index) => {
              const userRole = roles.find((role) => role.userId === staff._id);

              return (
                <div key={index} className="each-staff">
                  <div className="staff-info">
                    <span>{staff.firstName + " " + staff.lastName}</span>
                    <span>{userRole && userRole.role}</span>
                  </div>
                  <div className="staff-actions">
                    <button
                      onClick={() => {
                        setEditStaffID(staff._id);
                        setEditStaff(true);
                      }}
                      title="Edit user role"
                    >
                      <span className="fa fa-pencil"></span>
                    </button>
                    <button
                      onClick={() => handleRemoveUser(staff._id)}
                      title="remove user from your business"
                    >
                      <span className="fa fa-trash-o"></span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {editStaff && (
        <AppModal close={() => setEditStaff(false)}>
          <div className="edit-staff-modal">
            <h2>Edit Staff Role </h2>
            <select
              onChange={(e) => setEditStaffRole(e.target.value)}
              value={editStaffRole}
            >
              <option value="accountant">Accountant</option>
              <option value="sales rep">Sales Representative</option>
              <option value="stock keeper">Store Keeper</option>
              <option value="sales manager">Sales Manager</option>
            </select>
            <button onClick={() => handleUpdateUserRole(editStaffId)}>
              Done
            </button>
          </div>
        </AppModal>
      )}
      {addStaff && (
        <AppModal close={() => setAddStaff(false)}>
          <Staff opened={(data) => setAddStaff(data)} />
        </AppModal>
      )}
    </div>
  );
}

export default AllStaffs;
