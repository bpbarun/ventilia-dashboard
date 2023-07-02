import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import ControlSidebar from './components/ControlSidebar';
import Login from './components/Login';
import LeadGeneration from './components/LeadGeneration';
import UploadQuatation from './components/UploadQuatation';
import Reports from './components/Reports';


function App() {
  const [token_code, setTokenCode] = useState('');
  console.log('token_code===', localStorage.getItem("token_code"))
  useEffect(() => {
    axios.get('http://192.168.29.237/ventilia-api/api/auth/auth/' + localStorage.getItem("token_code"), {
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
          <Route path="/LeadGeneratioln" element={<LeadGeneration />} />
          <Route path="/QuotationUpload" element={<UploadQuatation />} />
          <Route path="/Reports" element={<Reports />} />

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
