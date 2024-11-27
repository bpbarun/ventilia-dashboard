import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Routes,
  Route,
} from "react-router-dom";
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import LeadGeneration from './components/LeadGeneration';
import Opportunity from './components/Opportunity';
import UploadQuatation from './components/UploadQuatation';
import Reports from './components/Reports';
import MyReport from './components/MyReport';
import CurrentLocation from './components/LocationTracker';
import ShowLocation from './components/ShowLocation';
import AttendenceCalendar from './components/AttendenceCalendar';
import Attendence from './components/Attendence';
import Leave from './components/Leave';
import RequestForApproval from './components/RequestForApproval';
import TeamReports from './components/TeamReports';
import { IP } from './components/Constant';
import './index.css'
function App() {
  const [token_code, setTokenCode] = useState('');
  console.log('token_code===', localStorage.getItem("token_code"))
  useEffect(() => {
    axios.get(IP + 'ventilia-api/api/auth/auth/' + localStorage.getItem("token_code"), {
      headers: {
        'token_code': localStorage.getItem("token_code"),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Access-Control-Allow-Headers': '*'
      }
    }).then((response) => {
      console.log('response==', response.data.data.token_code)
      setTokenCode(response.data.data.token_code);
    }).catch(err => console.log('response catch', err));
  }, [])
  if (token_code) {
    return (
      <>
        <Header />
        <Sidebar />
        <CurrentLocation />
        <Routes>
          <Route path="/" element={<LeadGeneration />} />
          <Route path="/LeadGeneration" element={<LeadGeneration />} />
          <Route path="/QuotationUpload" element={<UploadQuatation />} />
          <Route path="/QuotationUpload/:id" element={<UploadQuatation />} />
          <Route path="/Reports" element={<Reports />} />
          <Route path="/Opportunity" element={<Opportunity />} />
          <Route path="/MyReport" element={<MyReport />} />
          <Route path="/ShowLocation/:id" element={<ShowLocation />} />
          <Route path="/ShowLocation" element={<ShowLocation />} />
          <Route path="/AttendenceCalendar" element={<AttendenceCalendar />} />
          <Route path="/Attendence/:id" element={<Attendence />} />
          <Route path="/Attendence" element={<Attendence />} />
          <Route path="/Leave/:id" element={<Leave />} />
          <Route path="/Leave" element={<Leave />} />
          <Route path="/RequestForApproval" element={<RequestForApproval />} />
          <Route path="/TeamReports" element={<TeamReports />} />
        </Routes>
      </>
    )
  }
  else {
    return (
      <div className="App">
        <Login />
      </div>
    )
  }
}

export default App;
