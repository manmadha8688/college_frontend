import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getNotices, updateNotice, deleteNotice } from '../../services/api';

const Notices = () => {
  const { user } = useAuth();

  const [notices, setNotices] = useState([]);
  const [filteredNotices, setFilteredNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAudience, setSelectedAudience] = useState('all');
  const [editingNotice, setEditingNotice] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await getNotices();

        // Check if response has a 'notices' array property
        const noticesData = Array.isArray(response) ? response :
          (response?.notices || []);

        if (!Array.isArray(noticesData)) {
          throw new Error('Invalid data format received from server');
        }

        // Sort notices by date (newest first)
        const sortedNotices = [...noticesData].sort((a, b) => {
          const getTime = (n) =>
            new Date(
              n.updated_at ||
              n.datetime ||
              n.date ||
              n.created_at
            ).getTime();

          return getTime(b) - getTime(a); // newest first
        });


        setNotices(sortedNotices);
        setFilteredNotices(sortedNotices);
      } catch (err) {
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

  // Check if user is admin only
  const isAdmin = user?.role?.toLowerCase() === 'admin';

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

  const handleDeleteNotice = async (noticeId) => {
    if (!window.confirm('Are you sure you want to delete this notice?')) {
      return;
    }

    try {
      await deleteNotice(noticeId);

      // Update the state directly instead of refetching
      setNotices(prevNotices => {
        const updatedNotices = prevNotices.filter(notice =>
          notice.id !== noticeId && notice._id !== noticeId
        );
        return updatedNotices;
      });

      // Also update filtered notices
      setFilteredNotices(prevNotices =>
        prevNotices.filter(notice =>
          notice.id !== noticeId && notice._id !== noticeId
        )
      );

    } catch (err) {
      alert(err.message || 'Failed to delete notice.');
    }
  };

  const handleEditNotice = (notice) => {
    setEditingNotice(notice);
    // Format datetime for input
    const datetime = notice.datetime ? new Date(notice.datetime).toISOString().slice(0, 16) : '';
    const date = notice.date ? notice.date.split('T')[0] : '';

    setEditFormData({
      title: notice.title || '',
      content: notice.content || '',
      date: date,
      datetime: datetime,
      priority: notice.priority || 'normal',
    });
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };


  // Update the handleUpdateNotice function
  const handleUpdateNotice = async (e) => {
    e.preventDefault();

    try {
      const noticeId = editingNotice.id || editingNotice._id;
      const updateData = {
        ...editFormData,
        title: editFormData.title || null,
        content: editFormData.content || null,
        date: editFormData.date || null,
        datetime: editFormData.datetime || null,
        priority: editFormData.priority || 'normal',
      };

      await updateNotice(noticeId, updateData);

      setNotices(prevNotices => {
        return prevNotices
          .map(notice =>
            (notice.id === noticeId || notice._id === noticeId)
              ? {
                ...notice,
                ...updateData,
                updated_at: new Date().toISOString() // datetime
              }
              : notice
          )
          .sort((a, b) => {
            // Pick the correct field in order of priority
            const timeA = new Date(
              a.updated_at || a.datetime || a.date || a.created_at
            ).getTime();

            const timeB = new Date(
              b.updated_at || b.datetime || b.date || b.created_at
            ).getTime();

            return timeB - timeA; // Latest first
          });
      });


      // Also update filtered notices
      setFilteredNotices(prevNotices =>
        prevNotices.map(notice =>
          (notice.id === noticeId || notice._id === noticeId)
            ? { ...notice, ...updateData }
            : notice
        ).sort((a, b) => {
          const dateA = a.date || a.created_at;
          const dateB = b.date || b.created_at;
          return new Date(dateB) - new Date(dateA);
        })
      );

      setEditingNotice(null);
      setEditFormData({});
      alert('Notice updated successfully!');
    } catch (err) {
      alert(err.message || 'Failed to update notice.');
    }
  };

  const handleCancelEdit = () => {
    setEditingNotice(null);
    setEditFormData({});
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span>
                    👤 <strong>{notice.posted_by_name || 'Admin'}</strong>
                  </span>
                  {notice.updated_at && notice.updated_at !== notice.created_at && (
                    <span style={{ fontStyle: 'italic' }}>
                      Updated: {formatDate(notice.updated_at)}
                    </span>
                  )}
                </div>

                {/* Admin only - Edit and Delete buttons */}
                {isAdmin && (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleEditNotice(notice)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: '500',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDeleteNotice(notice.id || notice._id)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: '500',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ef4444'}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                )}
              </div>


            </div>
          ))
        )}
      </div>

      {/* Edit Notice Modal */}
      {editingNotice && isAdmin && (
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
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#111827' }}>Edit Notice</h2>
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

            <form onSubmit={handleUpdateNotice}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={editFormData.title || ''}
                  onChange={handleEditFormChange}
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
                  Content
                </label>
                <textarea
                  name="content"
                  value={editFormData.content || ''}
                  onChange={handleEditFormChange}
                  rows="4"
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

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                  Priority
                </label>
                <select
                  name="priority"
                  value={editFormData.priority || 'normal'}
                  onChange={handleEditFormChange}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="normal">Normal</option>
                  <option value="important">Important</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              {editingNotice.date && (
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={editFormData.date || ''}
                    onChange={handleEditFormChange}
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
              )}

              {editingNotice.datetime && (
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                    Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    name="datetime"
                    value={editFormData.datetime || ''}
                    onChange={handleEditFormChange}
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
              )}

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
                  Update Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notices;
