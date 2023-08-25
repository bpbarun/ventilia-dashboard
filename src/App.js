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
import { IP } from './components/Constant';


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
        <Routes>
          <Route path="/" element={<LeadGeneration />} />
          <Route path="/LeadGeneration" element={<LeadGeneration />} />
          <Route path="/QuotationUpload" element={<UploadQuatation />} />
          <Route path="/QuotationUpload/:id" element={<UploadQuatation />} />
          <Route path="/Reports" element={<Reports />} />
          <Route path="/Opportunity" element={<Opportunity />} />
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
