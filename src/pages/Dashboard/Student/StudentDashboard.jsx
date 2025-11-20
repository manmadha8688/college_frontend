// StudentDashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Dashboard.css';

const StudentDashboard = () => {
  const navigate = useNavigate();
  
  const stats = [
    { title: 'My Classes', value: '5', icon: '📚', path: '/student/classes' },
    { title: 'Assignments Due', value: '3', icon: '📝', path: '/student/assignments' },
    { title: 'Notices', value: '5', icon: '📢', path: '/student/notices' },
  ];

  return (
    <div className="dashboard-home">
      <h1>Student Dashboard</h1>
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

export default StudentDashboard;