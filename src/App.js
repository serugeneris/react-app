import React from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';

import SideBar from './components/Sidebar';
import sidebar_menu from './constants/sidebar-menu';

import './App.css';
import Suppliers from './pages/Suppliers';
import Users from './pages/Users';
import Index from './pages/Index';

function App () {
  return(
    <Router>
      <div className='dashboard-container'>
        <SideBar menu={sidebar_menu} />
          
          <div className='dashboard-body'>
              <Routes>
                  <Route path="*" element={<Index/>} />
                  <Route exact path="/" element={<Index/>} />
                  <Route exact path="/users" element={<Users/>} />
                  <Route exact path="/providers" element={<Suppliers/>} />
              </Routes>
          </div>
      </div>
    </Router>
  )
}

export default App;