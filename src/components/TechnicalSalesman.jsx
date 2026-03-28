import React, { useEffect, useState } from "react";
import Select from "react-select";
import { IP } from './Constant';
import axios from "axios";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TechnicalSalesman = () => {
  const [users, setUsers] = useState([]);
  const [teamleadOptions, setTeamleadOptions] = useState([]);
  const [technicalOptions, setTechnicalOptions] = useState([]);

  const [selectedTeamlead, setSelectedTeamlead] = useState(null);
  const [selectedTechnicians, setSelectedTechnicians] = useState([]);

  const [mappingList, setMappingList] = useState([]);
  const notify = (msg, type) => {
        if (type === 'success') {
            toast.success(msg);
        } else if (type === 'error') {
            toast.error(msg);
        } else {
            toast(msg);
        }
    }
  // 🔹 Fetch all users
  const fetchUsers = async () => {
    
    const res = axios.get(IP + 'ventilia-api/api/user/user',{
      headers: {
        'token_code': localStorage.getItem("token_code"),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Access-Control-Allow-Headers': '*'
    }
    }).then((response) => {
      setUsers(response.data.data)
      let data =  response.data.data
      const teamleads = data
      .filter((u) => u.user_role === "sealseman_teamlead")
      .map((u) => ({ label: u.user_name, value: u.user_id }));

    const sealseman = data
      .filter((u) => u.user_role === "sealseman")
      .map((u) => ({ label: u.user_name, value: u.user_id }));

    setTeamleadOptions(teamleads);
    setTechnicalOptions(sealseman);

    }).catch(err => {
        console.log(err);
    });
    
  };
  const fetchMappings = async () => {
    try {
      const res = await fetch(IP + 'ventilia-api/api/user/TechnicalSalesman', {
        headers: {
          token_code: localStorage.getItem("token_code"),
          "Content-Type": "application/json",
        },
      });
  
      const result = await res.json();
  
      if (result.status) {
        setMappingList(result.data || []);
      } else {
        setMappingList([]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchMappings();
  }, []);

  // 🔹 When teamlead selected
  const handleTeamleadChange = (selected) => {
    setSelectedTeamlead(selected);
    // find mapping from already fetched data
    const row = mappingList.find(
      (m) => Number(m.technical_id) === Number(selected.value)
    );
    if (row && row.sealesman_id) {
      const ids = row.sealesman_id.split(",").map(Number);
  
      const selectedTechs = technicalOptions.filter((opt) =>
        ids.includes(Number(opt.value)) // ✅ FIXED
      );
  
      setSelectedTechnicians(selectedTechs);
    } else {
      setSelectedTechnicians([]);
    }
  };

  // 🔹 Save mapping
  const handleSave = async () => {
    if (!selectedTeamlead) {
      alert("Please select technical");
      return;
    }
    const payload = {
      technical_id: selectedTeamlead.value,
      sealesman_id: selectedTechnicians.map((t) => t.value).join(","),
    };  
    const existing = mappingList.find(
      (m) => Number(m.technical_id) === Number(selectedTeamlead.value)
    );
    try {
      if (existing) {
        // ✅ UPDATE
        await axios.put(
          IP + "ventilia-api/api/user/TechnicalSalesman/" + selectedTeamlead.value,
          payload,
          {
            headers: {
              token_code: localStorage.getItem("token_code"),
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        // ✅ CREATE NEW
        await axios.post(
          IP + "ventilia-api/api/user/TechnicalSalesman",
          payload,
          {
            headers: {
              token_code: localStorage.getItem("token_code"),
              "Content-Type": "application/json",
            },
          }
        );
      }
      setSelectedTeamlead(null);
      setSelectedTechnicians([]);   
      notify('User Updated successfully.', 'success') 
      fetchMappings();
    } catch (err) {
      console.error(err);
    }
  };

  const rowData = mappingList.map((row) => {
    const techIds = row.sealesman_id
      ? row.sealesman_id.split(",").map(Number)
      : [];
  
    const techNames = users
      .filter((u) => techIds.includes(Number(u.user_id)))
      .map((u) => u.user_name)
      .join(", ");
  
    const teamleadName =
      users.find((u) => u.user_id == row.technical_id)?.user_name || "";
  
    return {
      technical: teamleadName,
      salesman: techNames,
      technical_id: row.technical_id,
    };
  });

  const columnDefs = [
    {
      headerName: "Technical",
      field: "technical",
      flex: 1,
    },
    {
      headerName: "Salesman",
      field: "salesman",
      flex: 2,
    },
    {
      headerName: "Action",
      field: "action",
      filter: false,
      sortable: false,  
      cellRenderer: (params) => {
        return (
          <button
            className="btn btn-sm btn-primary"
            onClick={() =>
              handleTeamleadChange({
                label: params.data.technical,
                value: params.data.technical_id,
              })
            }
          >
            Edit
          </button>
        );
      },
      // flex: 1,
    },
  ];
  return (
    <div className="content-wrapper leadGeneration-content">
      <section className="content">
        <div style={{ padding: "20px" }}>
          <h2>Technical & SalesMan</h2>

          {/* 🔹 Teamlead Dropdown */}
          <div style={{ marginBottom: "15px" }}>
            <label>Technical</label>
            <Select
              options={teamleadOptions}
              value={selectedTeamlead}
              onChange={handleTeamleadChange}
            />
          </div>

          {/* 🔹 Technician Multi Select */}
          <div style={{ marginBottom: "15px" }}>
            <label>Sales Man</label>
            <Select
              isMulti
              options={technicalOptions}
              value={selectedTechnicians}
              onChange={setSelectedTechnicians}
            />
          </div>

          {/* 🔹 Buttons */}
          <div style={{ marginBottom: "20px" }}>
            <button className="btn btn-sm btn-primary" onClick={handleSave} >Save</button>
            <button
            className="btn btn-sm btn-primary"
              style={{ marginLeft: "10px" }}
              onClick={() => setSelectedTechnicians(technicalOptions)}
            >
              Select All
            </button>
            <button
              style={{ marginLeft: "10px" }}
              className="btn btn-sm btn-primary"
              onClick={() => setSelectedTechnicians([])}
            >
              Clear
            </button>
          </div>

          {/* 🔹 Mapping Table */}
          {/* <h3>Existing Assignments</h3>
          <table border="1" cellPadding="10" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Technical</th>
                <th>SalesMan</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {mappingList.map((row, index) => {
                const techIds = row.sealesman_id
                  ? row.sealesman_id.split(",").map(Number)
                  : [];

                const techNames = users
                  .filter((u) => techIds.includes(Number(u.user_id))) // ✅ FIXED
                  .map((u) => u.user_name)
                  .join(", ");

                const teamleadName =
                  users.find((u) => u.user_id == row.technical_id)?.user_name || "";

                return (
                  <tr key={index}>
                    <td>{teamleadName}</td>
                    <td>{techNames}</td>
                    <td>
                      <button
                        onClick={() =>
                          handleTeamleadChange({
                            label: teamleadName,
                            value: row.technical_id,
                          })
                        }
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table> */}
          <h3>Existing Assignments</h3>
            <div
              className="ag-theme-alpine"
              style={{ height: "400px", width: "100%" }}
            >
              <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={{
                  sortable: true,
                  filter: true,
                  resizable: true,
                }}
                pagination={true}
                paginationPageSize={10}
              />
            </div>
        </div>
        </section>
      </div>
  );
};

export default TechnicalSalesman;