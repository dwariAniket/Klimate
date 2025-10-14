import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';



function App() {
  return (
    <>      
        <Routes>
          <Route 
            path="/login" 
            element={
             <Login/>
            } 
          />
          <Route 
            path="/register" 
            element={
             
              <Register/>
            } 
          />
          <Route 
            path="/" 
            element={
             <Dashboard/>
            } 
          />         
        </Routes>
    </>
  )
}

export default App;