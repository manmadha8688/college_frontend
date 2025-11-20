import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getStudents, deleteStudent, updateStudent } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa';

const StudentsList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    department: '',
    status: 'all',
    search: ''
  });

  useEffect(() => {
    // Check if user is admin
    if (user?.role?.toLowerCase() !== 'admin') {
      navigate('/');
      return;
    }

    fetchStudents();
  }, [user, navigate]);

  const fetchStudents = async () => {
    try {
      const response = await getStudents();
      const studentsData = response?.students || [];
      setStudents(studentsData);
      setFilteredStudents(studentsData);
    } catch (err) {
      setError(err.message || 'Failed to load students.');
    } finally {
      setLoading(false);
    }
  };

  // Apply filters
  useEffect(() => {
    if (!students.length) return;

    let result = [...students];

    if (filters.department) {
      result = result.filter(student => 
        student.department === filters.department
      );
    }

    if (filters.status !== 'all') {
      const isActive = filters.status === 'active';
      result = result.filter(student => 
        student.user?.is_active === isActive
      );
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(student => 
        `${student.user?.first_name} ${student.user?.last_name}`.toLowerCase().includes(searchTerm) ||
        student.student_id?.toLowerCase().includes(searchTerm) ||
        student.user?.email?.toLowerCase().includes(searchTerm)
      );
    }

    setFilteredStudents(result);
  }, [filters, students]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      department: '',
      status: 'all',
      search: ''
    });
  };

  const handleDelete = async (studentId) => {
    if (!window.confirm('Are you sure you want to delete this student?')) {
      return;
    }

    try {
      await deleteStudent(studentId);
      await fetchStudents();
    } catch (err) {
      alert(err.message || 'Failed to delete student.');
    }
  };

  const getDepartmentName = (dept) => {
    const deptMap = {
      'CS': 'Computer Science',
      'IT': 'Information Technology',
      'ECE': 'Electronics & Communication',
      'EE': 'Electrical & Electronics',
      'ME': 'Mechanical Engineering',
      'CE': 'Civil Engineering',
      'ADMIN': 'Administration'
    };
    return deptMap[dept] || dept;
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setEditFormData({
      email: student.user?.email || '',
      first_name: student.user?.first_name || '',
      last_name: student.user?.last_name || '',
      student_id: student.student_id || '',
      date_of_birth: student.date_of_birth ? student.date_of_birth.split('T')[0] : '',
      gender: student.gender || '',
      phone: student.phone || '',
      address: student.address || '',
      department: student.department || '',
    
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    try {
      await updateStudent(editingStudent.student_id, editFormData);
      await fetchStudents();
      setEditingStudent(null);
      setEditFormData({});
      alert('Student updated successfully!');
    } catch (err) {
      alert(err.message || 'Failed to update student.');
    }
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
    setEditFormData({});
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  

  const getGenderName = (gender) => {
    const genderMap = {
      'M': 'Male',
      'F': 'Female',
      'O': 'Other'
    };
    return genderMap[gender] || gender;
  };

  if (user?.role?.toLowerCase() !== 'admin') {
    return null;
  }

  return (
    <div>
      <div className="staff-header">
        <div className="header-content">
          <h1 className="staff-title">All Students</h1>
          <p className="staff-count">{filteredStudents.length} {filteredStudents.length === 1 ? 'student' : 'students'} found</p>
        </div>
      </div>

      <div className="filters-container">
        <div className="filters-header">
          <h3 className="filters-title">
            <FaFilter className="me-2" />
            Filters
          </h3>
          <button 
            className="clear-filters-btn" 
            onClick={() => {
              clearFilters();
              setShowFilters(!showFilters);
            }}
          >
            {showFilters ? <FaTimes /> : <FaFilter />}
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {showFilters && (
          <div className="filters-grid">
            <div className="filter-group">
              <label className="filter-label">Department</label>
              <select
                name="department"
                className="filter-select"
                value={filters.department}
                onChange={handleFilterChange}
              >
                <option value="">All Departments</option>
                <option value="CS">Computer Science</option>
                <option value="IT">Information Technology</option>
                <option value="ECE">Electronics & Communication</option>
                <option value="EE">Electrical & Electronics</option>
                <option value="ME">Mechanical Engineering</option>
                <option value="CE">Civil Engineering</option>
                <option value="ADMIN">Administration</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Status</label>
              <div className="status-filter">
                <div className="status-option">
                  <input
                    type="radio"
                    id="status-all"
                    name="status"
                    value="all"
                    checked={filters.status === 'all'}
                    onChange={handleFilterChange}
                  />
                  <label htmlFor="status-all">All</label>
                </div>
                <div className="status-option">
                  <input
                    type="radio"
                    id="status-active"
                    name="status"
                    value="active"
                    checked={filters.status === 'active'}
                    onChange={handleFilterChange}
                  />
                  <label htmlFor="status-active">Active</label>
                </div>
                <div className="status-option">
                  <input
                    type="radio"
                    id="status-inactive"
                    name="status"
                    value="inactive"
                    checked={filters.status === 'inactive'}
                    onChange={handleFilterChange}
                  />
                  <label htmlFor="status-inactive">Inactive</label>
                </div>
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-label">Search</label>
              <div className="search-box">
                <input
                  type="text"
                  name="search"
                  className="filter-input"
                  placeholder="Search by name, ID, or email..."
                  value={filters.search}
                  onChange={handleFilterChange}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading students...</p>
        </div>
      ) : error ? (
        <div className="error-message">
          <p>{error}</p>
        </div>
      ) : filteredStudents.length === 0 ? (
        <div style={{
          padding: '32px',
          textAlign: 'center',
          color: '#6b7280',
          backgroundColor: '#f9fafb',
          borderRadius: '8px',
          border: '1px dashed #e5e7eb'
        }}>
          No students found.
        </div>
      ) : (
        <div className="staff-table-container">
          <div className="table-responsive">
            <table className="staff-table">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Gender</th>
                  <th>Enrollment Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr key={student.student_id || index}>
                    <td>{student.student_id || 'N/A'}</td>
                    <td>
                      {student.user?.first_name} {student.user?.last_name}
                    </td>
                    <td>{student.user?.email || 'N/A'}</td>
                    <td>{getDepartmentName(student.department) || 'N/A'}</td>
                    <td>{getGenderName(student.gender) || 'N/A'}</td>
                    <td>{student.enrollment_date ? formatDate(student.enrollment_date) : 'N/A'}</td>
                    <td>
                      <span className={`status-badge ${student.user?.is_active ? 'active' : 'inactive'}`}>
                        {student.user?.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="actions">
                      <div className="action-buttons">
                        <button
                          onClick={() => handleEdit(student)}
                         style={{
                            padding: '6px 12px',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '13px',
                            fontWeight: '500'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDelete(student.student_id)}
                         style={{
                            padding: '6px 12px',
                            backgroundColor: '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '13px',
                            fontWeight: '500'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ef4444'}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredStudents.length === 0 && (
                  <tr>
                    <td colSpan="8" className="no-data">
                      No students found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {editingStudent && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
          onClick={(e) => e.target === e.currentTarget && handleCancelEdit()}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              maxWidth: '600px',
              width: '90%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#111827' }}>Edit Student</h2>
              <button
                onClick={handleCancelEdit}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '24px',
                  color: '#6b7280',
                  padding: '0',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleUpdate}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={editFormData.first_name || ''}
                    onChange={handleEditChange}
                    required
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={editFormData.last_name || ''}
                    onChange={handleEditChange}
                    required
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={editFormData.email || ''}
                  onChange={handleEditChange}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                    Student ID *
                  </label>
                  <input
                    type="text"
                    name="student_id"
                    value={editFormData.student_id || ''}
                    onChange={handleEditChange}
                    required
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                    Department *
                  </label>
                  <select
                    name="department"
                    value={editFormData.department || ''}
                    onChange={handleEditChange}
                    required
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="">Select Department</option>
                    <option value="CS">Computer Science</option>
                    <option value="IT">Information Technology</option>
                    <option value="ECE">Electronics & Communication</option>
                    <option value="EE">Electrical & Electronics</option>
                    <option value="ME">Mechanical Engineering</option>
                    <option value="CE">Civil Engineering</option>
                    <option value="ADMIN">Administration</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="date_of_birth"
                    value={editFormData.date_of_birth || ''}
                    onChange={handleEditChange}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={editFormData.gender || ''}
                    onChange={handleEditChange}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="">Select Gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Other</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={editFormData.phone || ''}
                  onChange={handleEditChange}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                  Address
                </label>
                <textarea
                  name="address"
                  value={editFormData.address || ''}
                  onChange={handleEditChange}
                  rows="3"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#f3f4f6',
                    color: '#374151',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  Update Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsList;

