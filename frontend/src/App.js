import React from 'react';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Existing pages
import Login from './Pages/Auth/Login.js';
import Register from './Pages/Auth/Register.js';
import Home from './Pages/Home/Home.js';
import SetAvatar from './Pages/Avatar/setAvatar.js';

import Transactions from './Pages/Transactions/Transactions';
import Stocks from './Pages/Stocks/Stocks';
import AdminDashboard from './Pages/Admin/AdminDashboard';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Public / General Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/setAvatar" element={<SetAvatar />} />
          
          {/* Application-specific Routes */}
          <Route path="/stocks" element={<Stocks />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
