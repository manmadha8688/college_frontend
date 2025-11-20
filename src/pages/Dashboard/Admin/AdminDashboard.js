import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Dashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  const stats = [
    { title: 'Total Students', value: '1,234', icon: '👥', path: '/admin/students' },
    { title: 'Total Staff', value: '45', icon: '👨‍🏫', path: '/admin/staff' },
    { title: 'Active Notices', value: '12', icon: '📢', path: '/admin/notices' },
    { title: 'Upcoming Events', value: '5', icon: '📅', path: '/admin/events' },
  ];

  return (
    <div className="dashboard-home">
      <h1>Admin Dashboard</h1>
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
      
      {/* Add admin-specific sections here */}
      <div className="dashboard-section">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <button onClick={() => navigate('/admin/add-student')} className="btn btn-primary">
            Add New Student
          </button>
          <button onClick={() => navigate('/admin/add-staff')} className="btn btn-secondary">
            Add New Staff
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
