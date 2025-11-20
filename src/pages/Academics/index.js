import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../../styles/Academics.css';

const Academics = () => {
  return (
    <div className="academics-page">
      <div className="academics-hero">
        <div className="container">
          <h1>Academics</h1>
          <p>Excellence in Education and Research</p>
        </div>
      </div>
      
      <div className="academics-content">
        <div className="container">
          
          
          <div className="academics-main">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Academics;
