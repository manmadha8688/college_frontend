import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getStaff, deleteStaff, updateStaff, assignHOD } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './StaffList.css';

const StaffList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [staff, setStaff] = useState([]);
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingStaff, setEditingStaff] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [filters, setFilters] = useState({
    department: '',
    designation: '',
    status: 'all',
    search: ''
  });
  const [showHODModal, setShowHODModal] = useState(false);
  const [selectedStaffForHOD, setSelectedStaffForHOD] = useState(null);
  const [isAssigningHOD, setIsAssigningHOD] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);


  
// Add these style objects above the return statement
const labelStyle = {
  display: 'block',
  marginBottom: '6px',
  fontSize: '14px',
  fontWeight: '500',
  color: '#374151'
};

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  border: '1px solid #d1d5db',
  borderRadius: '6px',
  fontSize: '14px',
  boxSizing: 'border-box'
};

const currencySymbol = {
  position: 'absolute',
  left: '12px',
  top: '50%',
  transform: 'translateY(-50%)',
  color: '#6b7280'
};

const cancelButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#f3f4f6',
  color: '#374151',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '500'
};

const submitButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#3b82f6',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '500'
};

  // First, I'll add these style objects at the top of the component, after the imports
const modalContainer = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  backdropFilter: 'blur(2px)'
};

const modalContent = {
  backgroundColor: 'white',
  borderRadius: '12px',
  padding: '24px',
  width: '90%',
  maxWidth: '500px',
  maxHeight: '90vh',
  overflowY: 'auto',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
};

const modalHeader = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
  paddingBottom: '16px',
  borderBottom: '1px solid #e5e7eb'
};

const modalTitle = {
  fontSize: '20px',
  fontWeight: '600',
  color: '#111827'
};

const closeButton = {
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
};

const formGroup = {
  marginBottom: '16px'
};

const textareaStyle = {
  ...inputStyle,
  minHeight: '100px',
  resize: 'vertical'
};

const buttonGroup = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '12px',
  marginTop: '24px',
  paddingTop: '16px',
  borderTop: '1px solid #e5e7eb'
};

const button = {
  padding: '8px 16px',
  borderRadius: '6px',
  fontSize: '14px',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'all 0.2s'
};

const cancelButton = {
  ...button,
  border: '1px solid #d1d5db',
  backgroundColor: '#fff',
  color: '#374151'
};

const submitButton = {
  ...button,
  border: 'none',
  backgroundColor: '#4f46e5',
  color: 'white'
};



  // Check if user is admin
  useEffect(() => {
    if (user?.role?.toLowerCase() !== 'admin') {
      navigate('/');
      return;
    }
    fetchStaff();
  }, [user, navigate]);

  const getDepartmentName = (dept) => {
    const deptMap = {
      'CSE': 'Computer Science',
      'IT': 'Information Technology',
      'ECE': 'Electronics & Communication',
      'EE': 'Electrical & Electronics',
      'ME': 'Mechanical Engineering',
      'CE': 'Civil Engineering',
      'ADMIN': 'Administration',
      'ACCOUNTS': 'Accounts',
      'LIBRARY': 'Library',
      'OTHER': 'Other'
    };
    return deptMap[dept] || dept;
  };

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const response = await getStaff();
      const staffData = response?.staff || [];
      
      setStaff(staffData);
      setFilteredStaff(staffData);
    } catch (err) {
      setError(err.message || 'Failed to load staff members.');
      toast.error('Failed to load staff members');
    } finally {
      setLoading(false);
    }
  };

  // Apply filters
  useEffect(() => {
    if (!staff.length) return;

    let result = [...staff];

    if (filters.department) {
      result = result.filter(member => 
        member.department === filters.department
      );
    }

    if (filters.designation) {
      result = result.filter(member => 
        member.designation === filters.designation
      );
    }

    if (filters.status !== 'all') {
      const isActive = filters.status === 'active';
      result = result.filter(member => 
        member.user?.is_active === isActive
      );
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(member => 
        `${member.user?.first_name} ${member.user?.last_name}`.toLowerCase().includes(searchTerm) ||
        member.staff_id?.toLowerCase().includes(searchTerm) ||
        member.user?.email?.toLowerCase().includes(searchTerm)
      );
    }

    setFilteredStaff(result);
  }, [filters, staff]);

  const handleDelete = async (staffId) => {
    if (!window.confirm('Are you sure you want to delete this staff member?')) {
      return;
    }

    try {
      const response = await deleteStaff(staffId);
      if (response.detail) {
        // If the backend returns a detailed error message
        throw new Error(response.detail);
      }
      await fetchStaff();
      toast.success('Staff member deleted successfully');
    } catch (err) {
      // Error handling for staff member deletion
      // Show more specific error messages based on the error response
      if (err.response?.data?.detail) {
        toast.error(`Delete failed: ${err.response.data.detail}`);
      } else if (err.message.includes('400')) {
        toast.error('Cannot delete staff member: This record is referenced by other data.');
      } else if (err.message.includes('403')) {
        toast.error('You do not have permission to delete staff members.');
      } else if (err.message.includes('404')) {
        toast.error('Staff member not found.');
      } else {
        toast.error(err.message || 'Failed to delete staff member. Please try again.');
      }
    }
  };

  const handleEdit = (staffMember) => {
    setEditingStaff(staffMember);
    setEditFormData({
      email: staffMember.user?.email || '',
      first_name: staffMember.user?.first_name || '',
      last_name: staffMember.user?.last_name || '',
      staff_id: staffMember.staff_id || '',
      date_of_birth: staffMember.date_of_birth ? staffMember.date_of_birth.split('T')[0] : '',
      gender: staffMember.gender || '',
      phone: staffMember.phone || '',
      address: staffMember.address || '',
      department: staffMember.department || '',
      designation: staffMember.designation || '',
      qualification: staffMember.qualification || '',
      salary: staffMember.salary || '',
    });
    // Add smooth scroll to edit form
    setTimeout(() => {
      const editForm = document.getElementById('edit-staff-form');
      if (editForm) {
        editForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingStaff) return;
    
    // Basic validation
    if (!editFormData.email || !editFormData.first_name || !editFormData.last_name) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsUpdating(true);
    
    try {
      // Prepare the update data to match the API's expected format
      const updateData = {
        ...editFormData,
        // Convert empty strings to null for numeric fields
        salary: editFormData.salary ? parseFloat(editFormData.salary) : null
      };
      
      // Call the API to update the staff member using staff_id
      await updateStaff(editingStaff.staff_id, updateData);
      
      // Refresh the staff list to get the updated data
      await fetchStaff();
      
      // Reset the form and editing state
      setEditingStaff(null);
      setEditFormData({});
      
      toast.success('Staff member updated successfully!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      // Error handling for staff member update
      toast.error(err.message || 'Failed to update staff member.', {
        position: "top-center"
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancelEdit = () => {
    if (Object.keys(editFormData).some(key => 
      editFormData[key] !== (editingStaff?.[key] || editingStaff?.user?.[key] || '')
    )) {
      if (window.confirm('You have unsaved changes. Are you sure you want to cancel?')) {
        setEditingStaff(null);
        setEditFormData({});
      }
    } else {
      setEditingStaff(null);
      setEditFormData({});
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      department: '',
      designation: '',
      status: 'all',
      search: ''
    });
  };

  const handleAssignHOD = (staff) => {
    setSelectedStaffForHOD(staff);
    setShowHODModal(true);
  };

  const handleHODSubmit = async (e) => {
    e.preventDefault();
    setIsAssigningHOD(true);
    
    try {
      const formData = new FormData(e.target);
      const additional_responsibilities = formData.get('additional_responsibilities');
      // Prepare HOD assignment data
      
      await assignHOD(selectedStaffForHOD.user.id, {
        department: selectedStaffForHOD.department,
        additional_responsibilities
      });
      
      toast.success(
        `${selectedStaffForHOD.user.first_name} ${selectedStaffForHOD.user.last_name} assigned as HOD of ${getDepartmentName(selectedStaffForHOD.department)}`
      );
      setShowHODModal(false);
      await fetchStaff();
    } catch (err) {
      toast.error(err.message || 'Failed to assign HOD');
    } finally {
      setIsAssigningHOD(false);
    }
  };

  // Get unique values for filters
  const departments = [...new Set(staff.map(s => s.department))].filter(Boolean).sort();
  const designations = [...new Set(staff.map(s => s.designation))].filter(Boolean).sort();

  if (loading) return (
    <div className="loading-container">
      <div>
        <div className="loading-spinner"></div>
        <p className="text-gray-600">Loading staff members...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="error-message" role="alert">
      <span>{error}</span>
    </div>
  );

  

  return (
    <div className="staff-list-container">
      <header className="staff-header">
        <div className="header-content">
          <h1 className="staff-title">Staff Members</h1>
          <p className="staff-count">{filteredStaff.length} members found</p>
        </div>
        <button 
          onClick={() => navigate('/admin/add-staff')} 
          className="add-staff-btn"
          aria-label="Add new staff member"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Staff
        </button>
      </header>
      
      {/* Filters Section */}
      <div className="filters-container">
        <div className="filters-header">
          <h2 className="filters-title">Filter Staff</h2>
          <button 
            onClick={clearFilters}
            className="clear-filters-btn"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Clear all filters
          </button>
        </div>
        
        <div className="filters-grid">
          <div className="filter-group">
            <label className="filter-label">Department</label>
            <select
              name="department"
              value={filters.department}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {getDepartmentName(dept)}
                </option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label className="filter-label">Designation</label>
            <select
              name="designation"
              value={filters.designation}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">All Designations</option>
              {designations.map((desig) => (
                <option key={desig} value={desig}>
                  {desig}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Status</label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          
          <div className="filter-group search-input-container">
            <label className="filter-label">Search</label>
            <div className="relative">
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search by name, ID or email..."
                className="filter-input search-input"
              />
              
            </div>
          </div>
        </div>
      </div>
      
      <div className="staff-table-container">
        <table className="staff-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaff.length > 0 ? (
              filteredStaff.map((member) => (
                <tr key={member.staff_id}>
                  <td>{member.staff_id}</td>
                  <td>
                    <div className="flex items-center">
                      <div className="user-avatar">
                        {member.user?.first_name?.[0]}{member.user?.last_name?.[0]}
                      </div>
                      <div className="user-info">
                        <div className="user-name">
                          {member.user?.first_name} {member.user?.last_name}
                        </div>
                        <div className="user-email">
                          {member.user?.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="department-name">{getDepartmentName(member.department)}</div>
                    <div className="department-code">{member.department}</div>
                  </td>
                  <td>
                    <div className="designation">{member.designation || 'N/A'}</div>
                    {member.qualification && (
                      <div className="qualification">{member.qualification}</div>
                    )}
                  </td>
                  <td>
                    {member.is_hod ? (
                      <span className="status-badge status-hod">
                        HOD - {member.hod_department ? getDepartmentName(member.hod_department) : ''}
                      </span>
                    ) : member.user?.is_active || member.is_active ? (
                      <span className="status-badge status-active">Active</span>
                    ) : (
                      <span className="status-badge status-inactive">Inactive</span>
                    )}
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button
                        onClick={() => handleEdit(member)}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#3b82f6',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '13px',
                          fontWeight: '500',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
                        title="Edit Staff"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1-8H9m-1 4h1m5-6h5M4 12a9 9 0 018-9V1h.02a9 9 0 01.882 5.205l3 6A9 9 0 0112 9V1h.02a9 9 0 01.883 5.205l2 6a9 9 0 01-.883 5.205V12a9 9 0 01-9 9v-9C5 4.864 4.638 5 4.5 5.5V7a9 9 0 018-9z" />
                        </svg>
                        Edit
                      </button>
                      
                      {!member.is_hod && member.department && (
                        <button
                          onClick={() => handleAssignHOD(member)}
                          style={{
                            padding: '6px 14px',
                            background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '13px',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            boxShadow: '0 2px 5px rgba(139, 92, 246, 0.3)',
                            transition: 'all 0.3s ease',
                            position: 'relative',
                            overflow: 'hidden',
                            zIndex: '1'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 4px 8px rgba(139, 92, 246, 0.4)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 2px 5px rgba(139, 92, 246, 0.3)';
                          }}
                          onMouseDown={(e) => {
                            e.currentTarget.style.transform = 'translateY(1px)';
                            e.currentTarget.style.boxShadow = '0 1px 3px rgba(139, 92, 246, 0.3)';
                          }}
                          onMouseUp={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 4px 8px rgba(139, 92, 246, 0.4)';
                          }}
                          title="Assign as HOD"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{
                            filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.1))',
                            transform: 'scale(1.1)'
                          }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                          <span style={{
                            textShadow: '0 1px 1px rgba(0,0,0,0.1)'
                          }}>HOD</span>
                        </button>
                      )}
                      
                      <button
                        onClick={() => handleDelete(member.staff_id)}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#ef4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '13px',
                          fontWeight: '500',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ef4444'}
                        title="Delete Staff"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="empty-state">
                  <div className="empty-state-icon">
                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <p className="empty-state-text">No staff members found</p>
                  <p className="text-sm">Try adjusting your search or filter criteria</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modern HOD Assignment Modal */}
{showHODModal && selectedStaffForHOD && (
  <div style={modalContainer} onClick={() => setShowHODModal(false)}>
    <div style={modalContent} onClick={e => e.stopPropagation()}>
      <div style={modalHeader}>
        <h2 style={modalTitle}>Assign as Head of Department</h2>
        <button 
          style={closeButton} 
          onClick={() => setShowHODModal(false)}
          disabled={isAssigningHOD}
        >
          &times;
        </button>
      </div>

      <form onSubmit={handleHODSubmit}>
        <div style={{ 
          backgroundColor: '#f3f4f6', 
          padding: '16px', 
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <p style={{ margin: '0 0 8px 0', fontWeight: '500' }}>
            {selectedStaffForHOD.user?.first_name} {selectedStaffForHOD.user?.last_name}
          </p>
          <p style={{ margin: '0', color: '#6b7280', fontSize: '14px' }}>
            {selectedStaffForHOD.designation || 'Staff Member'}
          </p>
          <p style={{ 
            margin: '8px 0 0 0', 
            color: '#4f46e5', 
            fontSize: '14px',
            fontWeight: '500'
          }}>
            {getDepartmentName(selectedStaffForHOD.department)} Department
          </p>
        </div>

        <div style={{ 
          backgroundColor: '#fffbeb',
          borderLeft: '4px solid #f59e0b',
          padding: '12px 16px',
          marginBottom: '20px',
          borderRadius: '0 6px 6px 0'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ color: '#d97706', marginTop: '2px' }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p style={{ margin: '0 0 4px 0', fontWeight: '600', color: '#92400e' }}>Heads up!</p>
              <p style={{ margin: 0, fontSize: '14px', color: '#92400e' }}>
                This will replace any existing HOD for the {getDepartmentName(selectedStaffForHOD.department)} department.
              </p>
            </div>
          </div>
        </div>

        <div style={formGroup}>
          <label style={labelStyle}>
            Additional Responsibilities
            <span style={{ color: '#9ca3af', marginLeft: '4px' }}>(Optional)</span>
          </label>
          <textarea
            name="additional_responsibilities"
            style={textareaStyle}
            placeholder="e.g., Faculty coordination, department meetings, etc."
            disabled={isAssigningHOD}
          />
        </div>

        <div style={buttonGroup}>
          <button
            type="button"
            onClick={() => setShowHODModal(false)}
            style={cancelButton}
            disabled={isAssigningHOD}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              ...submitButton,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              opacity: isAssigningHOD ? 0.7 : 1,
              cursor: isAssigningHOD ? 'not-allowed' : 'pointer'
            }}
            disabled={isAssigningHOD}
          >
            {isAssigningHOD ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Assigning...
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                Confirm Assignment
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  </div>
)}

      {/* Edit Staff Modal */}
{editingStaff && (
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
        maxWidth: '800px',
        width: '90%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#111827' }}>Edit Staff Member</h2>
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

      <form onSubmit={handleUpdate} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
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
            style={inputStyle}
          />
        </div>
        
        <div>
          <label style={labelStyle}>
            Last Name *
          </label>
          <input
            type="text"
            name="last_name"
            value={editFormData.last_name || ''}
            onChange={handleEditChange}
            required
            style={inputStyle}
          />
        </div>
        
        <div>
          <label style={labelStyle}>
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={editFormData.email || ''}
            onChange={handleEditChange}
            required
            style={inputStyle}
          />
        </div>
        
        <div>
          <label style={labelStyle}>
            Staff ID
          </label>
          <input
            type="text"
            name="staff_id"
            value={editFormData.staff_id || ''}
            onChange={handleEditChange}
            style={inputStyle}
          />
        </div>
        
        <div>
          <label style={labelStyle}>
            Date of Birth
          </label>
          <input
            type="date"
            name="date_of_birth"
            value={editFormData.date_of_birth || ''}
            onChange={handleEditChange}
            style={inputStyle}
          />
        </div>
        
        <div>
          <label style={labelStyle}>
            Gender
          </label>
          <select
            name="gender"
            value={editFormData.gender || ''}
            onChange={handleEditChange}
            style={inputStyle}
          >
            <option value="">Select Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other</option>
          </select>
        </div>
        
        <div>
          <label style={labelStyle}>
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={editFormData.phone || ''}
            onChange={handleEditChange}
            style={inputStyle}
          />
        </div>
        
        <div>
  <label style={labelStyle}>
    Department
  </label>
  <select
    name="department"
    value={editFormData.department || ''}
    onChange={handleEditChange}
    style={inputStyle}
  >
    <option value="">Select Department</option>
    <option value="CSE">Computer Science</option>
    <option value="IT">Information Technology</option>
    <option value="ECE">Electronics & Communication</option>
    <option value="EE">Electrical & Electronics</option>
    <option value="ME">Mechanical Engineering</option>
    <option value="CE">Civil Engineering</option>
    <option value="ADMIN">Administration</option>
    <option value="ACCOUNTS">Accounts</option>
    <option value="LIBRARY">Library</option>
    <option value="OTHER">Other</option>
  </select>
</div>
        
        <div>
          <label style={labelStyle}>
            Designation
          </label>
          <input
            type="text"
            name="designation"
            value={editFormData.designation || ''}
            onChange={handleEditChange}
            style={inputStyle}
          />
        </div>
        
        <div>
          <label style={labelStyle}>
            Qualification
          </label>
          <input
            type="text"
            name="qualification"
            value={editFormData.qualification || ''}
            onChange={handleEditChange}
            style={inputStyle}
          />
        </div>
        
        <div>
          <label style={labelStyle}>
            Salary
          </label>
          <div style={{ position: 'relative' }}>
            <span style={currencySymbol}>$</span>
            <input
              type="number"
              name="salary"
              value={editFormData.salary || ''}
              onChange={handleEditChange}
              step="0.01"
              style={{ ...inputStyle, paddingLeft: '24px' }}
            />
          </div>
        </div>
        
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>
            Address
          </label>
          <textarea
            name="address"
            value={editFormData.address || ''}
            onChange={handleEditChange}
            rows="3"
            style={{
              ...inputStyle,
              resize: 'vertical',
              minHeight: '80px'
            }}
          />
        </div>
        
        <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
          <button
            type="button"
            onClick={handleCancelEdit}
            style={cancelButtonStyle}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={submitButtonStyle}
            disabled={isUpdating}
          >
            {isUpdating ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  </div>


      )}
    </div>
  );
};

export default StaffList;