import React from 'react';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Create from './Pages/Create';
import { Routes, Route, } from 'react-router-dom';
import CricketScorecard from './Pages/CricketScorecard'
import MatchHistory from './Pages/Matchhistory';
import Dashboard from './Pages/Dashboard';
import User from './Pages/User'
import Hello from './Pages/Hello';




const MainRouter = () => {
  return (
    <div>
      <Routes>
        < Route path="/register" element={<Create/>} />
        < Route path="/" element={<Login />} />
        < Route path="/home" element={<Home />} />
        < Route path="/scorecard" element={<CricketScorecard />} />
        < Route path="/matches" element={<MatchHistory/>} />
        < Route path="/dashboard" element={<Dashboard/>} />
        < Route path="/users" element={<User/>} />
        < Route path="/hello" element={<Hello/>} />
    

      </Routes>
    </div>
  )
}

export default MainRouter;