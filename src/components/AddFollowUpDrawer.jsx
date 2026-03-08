import React, { useState, useRef } from "react";
import axios from "axios";
import { IP } from "./Constant";
import Select from 'react-select';

const AddFollowUpDrawer = ({ onClose, onSave,leads }) => {
  const [leadName, setLeadName] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("Call");
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const recognitionRef = useRef(null);

  const headers = {
    'token_code': localStorage.getItem("token_code"),
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Headers': '*'
};

  // 🎤 Start Voice Recognition
  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice recognition not supported in this browser");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-IN";   // You can change to hi-IN if Hindi needed
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      parseWithAI(transcript);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  // 📝 Submit
  const handleSubmit = async () => {
    if (!selectedLead || !date) {
      alert("Lead and Date required");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        `${IP}ventilia-api/index.php/api/leadGeneration/followUp`,
        {
          lead_name: selectedLead.label,
          followup_date: date,
          followup_type: type,
          remarks: remarks,
        },
        { headers }
      );

      if (response?.data?.status) {
        onSave();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const parseWithAI = async (voiceText) => {
    try {
      const response = await axios.post(
        `${IP}ventilia-api/index.php/api/leadGeneration/followUp/aiParse`,
        { text: voiceText },
        {headers}
      );
  
      if (response?.data?.status) {
        const aiData = response.data.data;
  
        setDate(
          aiData.followup_date
            ? aiData.followup_date.replace(" ", "T")
            : ""
        );
  
        setType(aiData.followup_type || "Call");
        setRemarks(aiData.remarks || "");
        setLeadName(aiData.lead_name || "");
      }
    } catch (error) {
      console.error("AI Parse Error:", error);
    }
  };
  const leadOptions = leads?.map((lead) => ({
    value: lead.lead_id,
    label: `${lead.client_name}`
  }));
  return (
    <div className="drawer">
      <div className="drawer-content">
        <h3>Add Follow-Up 🎤</h3>

        {/* <input
          placeholder="Lead Name"
          value={leadName}
          onChange={(e) => setLeadName(e.target.value)}
        /> */}
  
        <div className="form-group">                                
          <Select
            style={{marginBottom:'1rem'}}
            options={leadOptions}
            value={selectedLead}
            onChange={(option) => setSelectedLead(option)}
            placeholder="Search Lead..."
            isClearable
          />
        </div>
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Call">Call</option>
          <option value="Visit">Visit</option>
          <option value="WhatsApp">WhatsApp</option>
        </select>

        {/* Remarks with Voice */}
        <div style={{ display: "flex", gap: "10px" }}>
          <textarea
            placeholder="Remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            style={{ flex: 1 }}
          />

          {/* <button type="button" onClick={startListening}>
            {listening ? "🎙 Listening..." : "🎤"}
          </button> */}
        </div>

        <div className="actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFollowUpDrawer;