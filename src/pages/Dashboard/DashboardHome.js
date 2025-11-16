import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getNotices } from '../../services/api';

const DashboardHome = () => {
  const { user, token } = useAuth();
  const [notices, setNotices] = useState([]);
  const [filteredNotices, setFilteredNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAudience, setSelectedAudience] = useState('all');

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await getNotices();
        console.log('API Response:', response);

        // Check if response has a 'notices' array property
        const noticesData = Array.isArray(response) ? response :
          (response?.notices || []);

        if (!Array.isArray(noticesData)) {
          throw new Error('Invalid data format received from server');
        }

        // Sort notices by date (newest first)
        const sortedNotices = [...noticesData].sort((a, b) => {
          const dateA = a.date || a.created_at;
          const dateB = b.date || b.created_at;
          return new Date(dateB) - new Date(dateA);
        });

        setNotices(sortedNotices);
        setFilteredNotices(sortedNotices);
      } catch (err) {
        console.error('Error fetching notices:', err);
        setError('Failed to load notices. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, [user]);

  // Format date to display in a more readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get current date for display
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Get unique categories from notices
  const categories = ['all', ...new Set(notices.map(notice => notice.category).filter(Boolean))];
  const audienceTypes = ['all', 'staff'];

  // Check if user is admin or staff
  const isAdminOrStaff = user?.role?.toLowerCase() === 'admin' || user?.role?.toLowerCase() === 'staff';

  // Filter notices by selected category and audience
  const filterNotices = (category, audience) => {
    let result = [...notices];

    // Apply audience filter only for admin/staff users
    if (isAdminOrStaff) {
      if (audience === 'staff') {
        result = result.filter(notice => notice.audience === 'staff');
      } else {
        // For 'all', include both 'all' and 'staff' audiences
        result = result.filter(notice => notice.audience === 'all' || notice.audience === 'staff');
      }
    } else {
      // For non-admin/non-staff, only show 'all' audience notices
      result = result.filter(notice => notice.audience === 'all');
    }

    // Apply category filter
    if (category !== 'all') {
      result = result.filter(notice => notice.category === category);
    }

    return result;
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    const filtered = filterNotices(category, selectedAudience);
    setFilteredNotices(filtered);
  };

  const handleAudienceChange = (e) => {
    const audience = e.target.value;
    setSelectedAudience(audience);
    const filtered = filterNotices(selectedCategory, audience);
    setFilteredNotices(filtered);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '28px', marginBottom: '8px', color: '#111827' }}>
            Welcome, {user?.first_name || user?.email}!
          </h1>

        </div>
        <div style={{
          fontSize: '14px',
          color: '#4b5563',
          backgroundColor: '#f3f4f6',
          padding: '8px 16px',
          borderRadius: '8px',
          fontWeight: '500'
        }}>
          Today : {currentDate}
        </div>
      </div>

      {/* Filters */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        margin: '16px 0',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {/* Audience Filter - Only show for admin/staff */}
          {isAdminOrStaff && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <label style={{
                fontSize: '14px',
                color: '#4b5563',
                fontWeight: '500',
                whiteSpace: 'nowrap'
              }}>
                Audience:
              </label>
              <select
                value={selectedAudience}
                onChange={handleAudienceChange}
                style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  backgroundColor: 'white',
                  fontSize: '14px',
                  color: '#374151',
                  cursor: 'pointer',
                  outline: 'none',
                  minWidth: '120px'
                }}
              >
                {audienceTypes.map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Category Filter - Always visible */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label style={{
              fontSize: '14px',
              color: '#4b5563',
              fontWeight: '500',
              whiteSpace: 'nowrap'
            }}>
              Category:
            </label>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid #d1d5db',
                backgroundColor: 'white',
                fontSize: '14px',
                color: '#374151',
                cursor: 'pointer',
                outline: 'none',
                minWidth: '180px'
              }}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gap: '16px',
        marginTop: '8px'
      }}>
        {loading ? (
          <p>Loading notices...</p>
        ) : error ? (
          <div style={{
            padding: '16px',
            backgroundColor: '#fef2f2',
            color: '#991b1b',
            borderRadius: '8px',
            borderLeft: '4px solid #dc2626'
          }}>
            {error}
          </div>
        ) : filteredNotices.length === 0 ? (
          <div style={{
            padding: '32px',
            textAlign: 'center',
            color: '#6b7280',
            backgroundColor: '#f9fafb',
            borderRadius: '8px',
            border: '1px dashed #e5e7eb'
          }}>
            No notices to display.
          </div>
        ) : (
          filteredNotices.map((notice) => (
            <div
              key={notice._id || notice.id}
              style={{
                background: '#fff',
                padding: '20px 24px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                position: 'relative',
                transition: 'all 0.2s ease',
                borderLeft: `4px solid ${notice.audience === 'staff' ? '#f97316' : '#3b82f6'}`
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              {/* Notice Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '12px',
                gap: '16px'
              }}>
                <div>
                  <h3 style={{
                    fontSize: '20px',
                    color: '#111827',
                    margin: '0 0 8px 0',
                    fontWeight: '600',
                    lineHeight: '1.3'
                  }}>
                    {notice.title}
                  </h3>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                    {/* Category Badge */}
                    {notice.category && (
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        fontSize: '12px',
                        color: '#3b82f6',
                        backgroundColor: '#eff6ff',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontWeight: '500'
                      }}>
                        {notice.category}
                      </span>
                    )}

                    {/* Priority Badge */}
                    {notice.priority && notice.priority !== 'normal' && (
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        fontSize: '12px',
                        color: notice.priority === 'high' ? '#dc2626' : '#d97706',
                        backgroundColor: notice.priority === 'high' ? '#fef2f2' : '#fffbeb',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontWeight: '500'
                      }}>
                        {notice.priority.charAt(0).toUpperCase() + notice.priority.slice(1)}
                      </span>
                    )}


                  </div>
                </div>

                {/* Date/Time Badge */}
                {(notice.date || notice.datetime) && (
                  <div style={{
                    backgroundColor: '#f9fafb',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    textAlign: 'center',
                    minWidth: '120px'
                  }}>
                    <div style={{
                      fontSize: '12px',
                      color: '#6b7280',
                      marginBottom: '2px'
                    }}>
                      {notice.date ? 'Date' : 'Date & Time'}
                    </div>

                    <div style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#111827'
                    }}>
                      {/* DATE ONLY */}
                      {notice.date && formatDate(notice.date)}

                      {/* DATETIME (DATE + TIME) */}
                      {notice.datetime && (
                        <>
                          <div>{formatDate(notice.datetime)}</div>
                          <div style={{ fontSize: '12px', color: '#6b7280' }}>
                            {new Date(notice.datetime).toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: true
                            })}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}

              </div>

              {/* Notice Content */}
              <div style={{
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                padding: '16px',
                margin: '12px 0',
                lineHeight: '1.6',
                whiteSpace: 'pre-line',
                color: '#374151',
                borderLeft: '3px solid #3b82f6'
              }}>
                {notice.content}
              </div>

              {/* Footer */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '12px',
                borderTop: '1px solid #f3f4f6',
                fontSize: '13px',
                color: '#6b7280'
              }}>
                <div>
                  <span style={{ marginRight: '12px' }}>
                    👤 <strong>{notice.posted_by_name || 'Admin'}</strong>
                  </span>

                </div>

                {notice.updated_at && notice.updated_at !== notice.created_at && (
                  <span style={{ fontStyle: 'italic' }}>
                    Updated: {formatDate(notice.updated_at)}
                  </span>
                )}
              </div>


            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DashboardHome;
