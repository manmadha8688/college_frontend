import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getProfile } from '../../services/api';
import './Profile.css';

const Profile = () => {
  const { user: contextUser } = useAuth();
  const [user, setUser] = useState(contextUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile();
        setUser(profileData);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    if (contextUser) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [contextUser]);

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading">Loading profile...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-container">
        <div className="error">No user data available</div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const getDepartmentName = (code) => {
    const departments = {
      'IT': 'Information Technology',
      'CS': 'Computer Science',
      'EE': 'Electrical Engineering',
      'ME': 'Mechanical Engineering',
      'CE': 'Civil Engineering',
      'ADMIN': 'Administration',
      'ACCOUNTS': 'Accounts',
      'LIBRARY': 'Library',
      'OTHER': 'Other',
    };
    return departments[code] || code;
  };

  const getGenderName = (code) => {
    const genders = {
      'M': 'Male',
      'F': 'Female',
      'O': 'Other',
    };
    return genders[code] || code;
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">My Profile</h1>

      <div className="profile-content">
        {/* User Information Card */}
        <div className="profile-card">
          <h2 className="card-title">User Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>Email</label>
              <div className="info-value">{user.email}</div>
            </div>
            <div className="info-item">
              <label>Full Name</label>
              <div className="info-value">{user.full_name || `${user.first_name} ${user.last_name}`}</div>
            </div>
            <div className="info-item">
              <label>First Name</label>
              <div className="info-value">{user.first_name}</div>
            </div>
            <div className="info-item">
              <label>Last Name</label>
              <div className="info-value">{user.last_name}</div>
            </div>
            <div className="info-item">
              <label>Role</label>
              <div className="info-value role-badge">{user.role?.toUpperCase()}</div>
            </div>
            <div className="info-item">
              <label>Date Joined</label>
              <div className="info-value">{formatDate(user.date_joined)}</div>
            </div>
          </div>
        </div>

        {/* Student Profile */}
        {user.student_profile && (
          <div className="profile-card">
            <h2 className="card-title">Student Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <label>Student ID</label>
                <div className="info-value">{user.student_profile.student_id}</div>
              </div>
              <div className="info-item">
                <label>Department</label>
                <div className="info-value">
                  {getDepartmentName(user.student_profile.department)}
                </div>
              </div>
              <div className="info-item">
                <label>Date of Birth</label>
                <div className="info-value">{formatDate(user.student_profile.date_of_birth)}</div>
              </div>
              <div className="info-item">
                <label>Gender</label>
                <div className="info-value">{getGenderName(user.student_profile.gender)}</div>
              </div>
              <div className="info-item">
                <label>Phone</label>
                <div className="info-value">{user.student_profile.phone || 'N/A'}</div>
              </div>
              <div className="info-item">
                <label>Enrollment Date</label>
                <div className="info-value">{formatDate(user.student_profile.enrollment_date)}</div>
              </div>
              {user.student_profile.address && (
                <div className="info-item full-width">
                  <label>Address</label>
                  <div className="info-value">{user.student_profile.address}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Staff Profile */}
        {user.staff_profile && (
          <div className="profile-card">
            <h2 className="card-title">Staff Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <label>Staff ID</label>
                <div className="info-value">{user.staff_profile.staff_id}</div>
              </div>
              <div className="info-item">
                <label>Department</label>
                <div className="info-value">
                  {getDepartmentName(user.staff_profile.department)}
                </div>
              </div>
              <div className="info-item">
                <label>Designation</label>
                <div className="info-value">{user.staff_profile.designation || 'N/A'}</div>
              </div>
              <div className="info-item">
                <label>Qualification</label>
                <div className="info-value">{user.staff_profile.qualification || 'N/A'}</div>
              </div>
              <div className="info-item">
                <label>Date of Birth</label>
                <div className="info-value">{formatDate(user.staff_profile.date_of_birth)}</div>
              </div>
              <div className="info-item">
                <label>Gender</label>
                <div className="info-value">{getGenderName(user.staff_profile.gender)}</div>
              </div>
              <div className="info-item">
                <label>Phone</label>
                <div className="info-value">{user.staff_profile.phone || 'N/A'}</div>
              </div>
              <div className="info-item">
                <label>Joining Date</label>
                <div className="info-value">{formatDate(user.staff_profile.joining_date)}</div>
              </div>
              {user.staff_profile.salary && (
                <div className="info-item">
                  <label>Salary</label>
                  <div className="info-value">${parseFloat(user.staff_profile.salary).toLocaleString()}</div>
                </div>
              )}
              {user.staff_profile.address && (
                <div className="info-item full-width">
                  <label>Address</label>
                  <div className="info-value">{user.staff_profile.address}</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

