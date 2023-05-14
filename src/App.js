import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import ControlSidebar from './components/ControlSidebar';
import Login from './components/Login'
import LeadGeneration from './components/LeadGeneration'

function App() {
  const [isLogin, setIsLogin] = useState(false);
  if(isLogin){
    return (
      <div className="App">
        <Header />
        <Sidebar />
        <LeadGeneration />
  
        {/* <Footer /> */}
        {/* <Dashboard /> */}
        {/* <ControlSidebar /> */}
        {/* <Login /> */}
  
      </div>
    );
  }else{
    return(
      <div className="App">
        <Login setIsLogin={setIsLogin}/>
        </div>
    )
  }
  
}

export default App;
