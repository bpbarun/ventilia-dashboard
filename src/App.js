import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import ControlSidebar from './components/ControlSidebar';
import Login from './components/Login'
import Login2 from './components/Login2'
import LeadGeneration from './components/LeadGeneration'

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="App">
      <Header />
      <Sidebar />
      {/* <Dashboard /> */}
      
      <LeadGeneration />
      <Footer />
      {/* <ControlSidebar /> */}
      {/* <Login /> */}
      {/* <Login2 /> */}

    </div>
  );
}

export default App;
