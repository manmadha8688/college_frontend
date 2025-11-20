import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getHODs } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './StaffList.css';
import { FaSearch, FaTrashAlt, FaUserTie, FaPlus, FaFilter, FaTimes } from 'react-icons/fa';

const HODList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [hods, setHODs] = useState([]);
  const [filteredHODs, setFilteredHODs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    department: '',
    status: 'all',
    search: ''
  });

  useEffect(() => {
    fetchHODs();
  }, []);

  const fetchHODs = async () => {
    try {
      setLoading(true);
      const response = await getHODs();
      const hodsData = response.results || response;
      setHODs(Array.isArray(hodsData) ? hodsData : []);
      setFilteredHODs(Array.isArray(hodsData) ? hodsData : []);
    } catch (err) {
      setError('Failed to fetch HODs');
      console.error('Error fetching HODs:', err);
      toast.error('Failed to load HODs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let result = [...hods];

    if (filters.department) {
      result = result.filter(hod => 
        hod.department_name?.toLowerCase() === filters.department.toLowerCase()
      );
    }

    if (filters.status !== 'all') {
      const isActive = filters.status === 'true';
      result = result.filter(hod => hod.is_active === isActive);
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(hod => 
        (hod.staff_name?.toLowerCase().includes(searchTerm)) ||
        (hod.staff_id?.toLowerCase().includes(searchTerm)) ||
        (hod.department_name?.toLowerCase().includes(searchTerm))
      );
    }
    setFilteredHODs(result);
  }, [filters, hods]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  

  const departmentOptions = [
    'IT', 'CS', 'EE', 'ME', 'CE', 'ADMIN', 'ACCOUNTS', 'LIBRARY', 'OTHER'
  ];

  if (loading) {
    return (
      <div className="staff-list-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading HODs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="staff-list-container">
        <div className="error-message">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="staff-list-container">
      <div className="staff-header">
        <div className="header-content">
          <h1 className="staff-title">Heads of Department</h1>
          <p className="staff-count">{filteredHODs.length} {filteredHODs.length === 1 ? 'HOD' : 'HODs'} found</p>
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
              setFilters({
                department: '',
                status: 'all',
                search: ''
              });
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
                onChange={handleInputChange}
              >
                <option value="">All Departments</option>
                {departmentOptions.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
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
                    onChange={handleInputChange}
                  />
                  <label htmlFor="status-all">All</label>
                </div>
                <div className="status-option">
                  <input
                    type="radio"
                    id="status-active"
                    name="status"
                    value="true"
                    checked={filters.status === 'true'}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="status-active">Active</label>
                </div>
                <div className="status-option">
                  <input
                    type="radio"
                    id="status-inactive"
                    name="status"
                    value="false"
                    checked={filters.status === 'false'}
                    onChange={handleInputChange}
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
                  placeholder="Search by name, ID, or department..."
                  value={filters.search}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="staff-table-container">
        <div className="table-responsive">
          <table className="staff-table">
            <thead>
              <tr>
                <th>Staff ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Start Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredHODs.length > 0 ? (
                filteredHODs.map(hod => (
                  <tr key={hod.id}>
                    <td>{hod.staff_id || 'N/A'}</td>
                    <td>{hod.staff_name || 'N/A'}</td>
                    <td>{hod.department_name || hod.department || 'N/A'}</td>
                    <td>{hod.start_date ? new Date(hod.start_date).toLocaleDateString() : 'N/A'}</td>
                    <td>
                      <span className={`status-badge ${hod.is_active ? 'active' : 'inactive'}`}>
                        {hod.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                   
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">
                    No HODs found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HODList;