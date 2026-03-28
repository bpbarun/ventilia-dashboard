import React, { useEffect, useState } from "react";
import Select from "react-select";
import { IP } from './Constant';
import axios from "axios";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TeamleadSalesman = () => {
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
      const res = await fetch(IP + 'ventilia-api/api/user/TeamleadSalesman', {
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
      (m) => Number(m.teamlead_id) === Number(selected.value)
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
  const handleSave = async () => {
      if (!selectedTeamlead) {
        alert("Please select technical");
        return;
      }
      const payload = {
        teamlead_id: selectedTeamlead.value,
        sealesman_id: selectedTechnicians.map((t) => t.value).join(","),
      };  
      const existing = mappingList.find(
        (m) => Number(m.technical_id) === Number(selectedTeamlead.value)
      );
      try {
        if (existing) {
          // ✅ UPDATE
          await axios.put(
            IP + "ventilia-api/api/user/TeamleadSalesman/" + selectedTeamlead.value,
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
            IP + "ventilia-api/api/user/TeamleadSalesman",
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
        notify('Getting some error, please try again later', 'error')
      }
    };
    const rowData = mappingList.map((row) => {
      const salesIds = row.sealesman_id
        ? row.sealesman_id.split(",").map(Number)
        : [];
    
      const salesNames = users
        .filter((u) => salesIds.includes(Number(u.user_id)))
        .map((u) => u.user_name)
        .join(", ");
    
      const teamleadName =
        users.find((u) => u.user_id == row.teamlead_id)?.user_name || "";
    
      return {
        teamlead: teamleadName,
        salesman: salesNames,
        teamlead_id: row.teamlead_id,
      };
    });
    const columnDefs = [
      {
        headerName: "Team Lead",
        field: "teamlead",
        flex: 1,
      },
      {
        headerName: "SalesMan",
        field: "salesman",
        flex: 2,
      },
      {
        headerName: "Action",
        field: "action",
        filter: false,
        sortable: false,
        suppressMenu: true,
        cellRenderer: (params) => {
          return (
            <button
              className="btn btn-sm btn-primary"
              onClick={() =>
                handleTeamleadChange({
                  label: params.data.teamlead,
                  value: params.data.teamlead_id,
                })
              }
            >
              Edit
            </button>
          );
        },
        flex: 1,
      },
    ];
  return (
    <div className="content-wrapper leadGeneration-content">
      <section className="content">
        <div style={{ padding: "20px" }}>
          <h2>TeamLead & Salesman</h2>

          {/* 🔹 Teamlead Dropdown */}
          <div style={{ marginBottom: "15px" }}>
            <label>Team Lead</label>
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
            <button onClick={handleSave} className="btn btn-sm btn-primary">Save</button>
            <button
            className="btn btn-sm btn-primary"
              style={{ marginLeft: "10px" }}
              onClick={() => setSelectedTechnicians(technicalOptions)}
            >
              Select All
            </button>
            <button
            className="btn btn-sm btn-primary"
              style={{ marginLeft: "10px" }}
              onClick={() => setSelectedTechnicians([])}
            >
              Clear
            </button>
          </div>
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

export default TeamleadSalesman;