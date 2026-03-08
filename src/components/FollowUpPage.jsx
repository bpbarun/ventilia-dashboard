import React, { useState, useEffect } from "react";
import axios from "axios";
import AddFollowUpDrawer from "./AddFollowUpDrawer";
import "./followup.scss";
import { IP } from "./Constant";
const headers = {
    'token_code': localStorage.getItem("token_code"),
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Headers': '*'
  };
const FollowUpPage = () => {
  const [activeTab, setActiveTab] = useState("today");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const userId = localStorage.getItem("user_id");
  const [leads, setLeads] = useState([]);

  const fetchFollowups = async (type) => {
    try {
      setLoading(true);
      let url = `${IP}ventilia-api/index.php/api/leadGeneration/followUp?assigned_to=${userId}`;
      if (type && type !== "all") {
        url += `&type=${type}`;
      }
      const response = await axios.get(url, { headers });
      if (response?.data?.status === true) {
        setData(response.data.data || []);
      } else {
        setData([]);
      }
    } catch (error) {
        console.error("Fetch Error:", error.response?.data || error.message);
        setData([]);
    } finally {
        setLoading(false);
    }
  };
  const fetchLeadData = () => {
    axios.get(IP + 'ventilia-api/index.php/api/leadGeneration/leadGeneration/', {
        headers: {
            'token_code': localStorage.getItem("token_code"),
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Access-Control-Allow-Headers': '*'
        }
    }).then((response) => {
        console.log('response',response)
        if (response?.data?.status) {
          setLeads(response.data.data || []);
        }
    }).catch(err => {
        console.log(err);
    });
  }
  useEffect(() => {
    fetchFollowups(activeTab);
  }, [activeTab]);
  
  useEffect(() => {
    fetchLeadData()
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const markComplete = async (id) => {
    try {
        const response = await axios.put(
            `${IP}ventilia-api/index.php/api/leadGeneration/followUp/${id}`,
            {
              status:'completed'
            },
            { headers }
          );

      if (response?.data?.status) {
        fetchFollowups(activeTab);
      }
    } catch (error) {
      console.error("Complete Error:", error.response?.data || error.message);
    }
  };
  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="followup-page">
          <div className="header">
            <h2>📞 Follow-Ups</h2>
            <button onClick={() => setShowDrawer(true)}>
              + Add Follow-Up
            </button>
          </div>
          <div className="tabs">
            {["today", "upcoming", "missed", "all"].map((tab) => (
              <button
                key={tab}
                className={activeTab === tab ? "active" : ""}
                onClick={() => handleTabClick(tab)}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Lead</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Remarks</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((item) => (
                    <tr key={item.followup_id}>
                      <td>{item.lead_name}</td>
                      <td>
                        {new Date(item.followup_date).toLocaleString()}
                      </td>
                      <td>{item.followup_type}</td>
                      <td>{item.remarks}</td>
                      <td>
                        <span className={`badge ${item.status}`}>
                          {item.status}
                        </span>
                      </td>
                      <td>
                        {item.status === "pending" && (
                          <button
                            onClick={() =>
                              markComplete(item.followup_id)
                            }
                          >
                            Mark Complete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No follow-ups found</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
          {showDrawer && (
            <AddFollowUpDrawer
              leads={leads}
              onClose={() => setShowDrawer(false)}
              onSave={() => {
                fetchFollowups(activeTab); // reload after add
                setShowDrawer(false);
              }}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default FollowUpPage;