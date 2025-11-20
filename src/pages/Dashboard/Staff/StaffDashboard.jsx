// StaffDashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Dashboard.css';

const StaffDashboard = () => {
  const navigate = useNavigate();
  
  const stats = [
    { title: 'My Students', value: '120', icon: '👥', path: '/staff/students' },
    { title: 'Active Notices', value: '8', icon: '📢', path: '/staff/notices' },
    { title: 'Upcoming Classes', value: '3', icon: '📚', path: '/staff/schedule' },
  ];

  return (
    <div className="dashboard-home">
      <h1>Staff Dashboard</h1>
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="stat-card"
            onClick={() => navigate(stat.path)}
          >
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-info">
              <h3>{stat.title}</h3>
              <p>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffDashboard;