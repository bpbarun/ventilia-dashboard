import React, { useEffect, useState } from "react";
import { IP } from './Constant';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export default function UserCrud() {
  const [rowData, setRowData] = useState([]);
  const [formData, setFormData] = useState({
    user_name: "",
    user_role: "",
    password: "",
    is_active: 1,
  });
  const [editId, setEditId] = useState(null);

  const getUsers = ()=>{
    axios.get(IP + 'ventilia-api/index.php/api/user/user/', {
      headers: {
          'token_code': localStorage.getItem("token_code"),
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          'Access-Control-Allow-Headers': '*'
      }
    }).then((response) => {
        if(response.data.status){
          setRowData(response.data.data);
        }
    }).catch(err => {
        console.log(err);
    });
  }
  const createUser = (data)=>{
    axios.post(IP + 'ventilia-api/index.php/api/user/user/',data, {
      headers: {
          'token_code': localStorage.getItem("token_code"),
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          'Access-Control-Allow-Headers': '*'
      }
    }).then((response) => {
        if(response.data.status){
          fetchUsers();
        }
    }).catch(err => {
        console.log(err);
    });
  }
  const updateUser = (id,data)=>{
    axios.put(IP + 'ventilia-api/index.php/api/user/user/'+id,data, {
      headers: {
          'token_code': localStorage.getItem("token_code"),
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          'Access-Control-Allow-Headers': '*'
      }
    }).then((response) => {
        if(response.data.status){
          fetchUsers();
        }
    }).catch(err => {
        console.log(err);
    });
  }
  const deleteUser = (id)=>{
    axios.delete(IP + 'ventilia-api/index.php/api/user/user/'+id, {
      headers: {
          'token_code': localStorage.getItem("token_code"),
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          'Access-Control-Allow-Headers': '*'
      }
    }).then((response) => {
        if(response.data.status){
          fetchUsers()
        }
    }).catch(err => {
        console.log(err);
    });
  }
  const fetchUsers = () => {
    getUsers();
  };

  useEffect(() => {
    getUsers();
  }, []);
  const openAddModal = () => {
    setEditId(null);  
    setFormData({
      user_name: "",
      user_role: "",
      password: "",
      is_active: 1
    });
  };
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };

  const handleEdit = (data) => {
    setEditId(data.user_id);
    setFormData({ ...data, password: "" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete?")) {
      deleteUser(id);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      updateUser(editId, formData)
    } else {
      createUser(formData);
    }
    window.location.reload();
  };
  

  const columnDefs = [
    { headerName: "ID", field: "user_id", flex: 1 },
    { headerName: "Name", field: "user_name", flex: 2 },
    { headerName: "Role", field: "user_role", flex: 2 },
    {
      headerName: "Active",
      field: "is_active",
      flex: 1,
      cellRenderer: (params) => (params.value ? "✅" : "❌"),
    },
    {
      headerName: "Actions",
      flex: 2,
      cellRenderer: (params) => (
        <>
          <button
            className="btn btn-sm btn-warning me-1"
            onClick={() => handleEdit(params.data)}
            data-toggle="modal" data-target="#userModal"
          >
            Edit
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleDelete(params.data.user_id)}
          >
            Delete
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="content-wrapper leadGeneration-content">
      <section className="content">
      <h2>User Management</h2>
      <a className="btn btn-primary add-user" data-toggle="modal" data-target="#userModal" onClick={openAddModal}>Add user</a>
      <div
          className="ag-theme-alpine table"
          style={{
              height: '50rem',
              width: '100%',
          }}
      >
        <AgGridReact
         defaultColDef={{
          sortable: true,
          filter: true,
          resizable: true,
          // floatingFilter:true
          }}
          columnDefs={columnDefs}
          rowData={rowData}
          pagination={true}
          paginationPageSize={100}
          animateRows={true}
        />
      </div>

      {/* Bootstrap Modal */}
      <div
        className="modal fade"
        id="userModal"
        tabIndex="-1"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">{editId ? "Edit User" : "Add User"}</h5>
                <button
                  type="button"
                  className="float-right"
                  data-dismiss="modal"
                  aria-label="Close"
                >x</button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Role</label>
                  <select
                    className="form-control"
                    value={formData.user_role}
                    onChange={(e) => setFormData({ ...formData, user_role: e.target.value })}
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="sealseman_teamlead">SalesMan Teamlead</option>
                    <option value="sealseman">Salesman</option>
                    <option value="technical">Technical</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Password {editId ? "(Leave blank to keep old)" : ""}
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required={!editId}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  {editId ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* </div>
      </section>
    </div> */}
    </section>
    </div>
  );
}
