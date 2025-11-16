import React, { useState } from 'react';
import { createNotice } from '../../services/api';
import './AddNotice.css';

// === Individual Forms for Categories ===
const formsByCategory = {
  // Staff Categories
  'Staff Meeting': ({ onClose, category, audience }) => (
    <ModalForm 
      title="Staff Meeting Notice" 
      category={category}
      audience={audience}
      fields={[
        { label: 'Title', name: 'title', type: 'text' },
        { label: 'Content', name: 'content', type: 'textarea' },
        { label: 'Date & Time', name: 'datetime', type: 'datetime-local' },
        { label: 'Priority', name: 'priority', type: 'select', options: ['normal','important','urgent'] }
      ]} 
      onClose={onClose} 
    />
  ),
  'Invigilation Duty': ({ onClose, category, audience }) => (
    <ModalForm title="Invigilation Duty Notice" category={category} audience={audience} fields={[
      { label: 'Title', name: 'title', type: 'text' },
      { label: 'Content', name: 'content', type: 'textarea' },
      { label: 'Duty Date & Time', name: 'datetime', type: 'datetime-local' },
    ]} onClose={onClose} />
  ),
  'Internal Circular': ({ onClose, category, audience }) => (
    <ModalForm title="Internal Circular Notice" category={category} audience={audience} fields={[
      { label: 'Title', name: 'title', type: 'text' },
      { label: 'Content', name: 'content', type: 'textarea' },
      { label: 'Date & Time', name: 'datetime', type: 'datetime-local' },
    ]} onClose={onClose} />
  ),
  'Timetable Work': ({ onClose, category, audience }) => (
    <ModalForm title="Timetable Work Notice" category={category} audience={audience} fields={[
      { label: 'Title', name: 'title', type: 'text' },
      { label: 'Content', name: 'content', type: 'textarea' },
      { label: 'Date', name: 'date', type: 'date' },
    ]} onClose={onClose} />
  ),
  'Leave / Policy Update': ({ onClose, category, audience }) => (
    <ModalForm title="Leave / Policy Update" category={category} audience={audience} fields={[
      { label: 'Title', name: 'title', type: 'text' },
      { label: 'Content', name: 'content', type: 'textarea' },
      { label: 'Effective Date', name: 'date', type: 'date' },
    ]} onClose={onClose} />
  ),
  'Faculty Training': ({ onClose, category, audience }) => (
    <ModalForm title="Faculty Training Notice" category={category} audience={audience} fields={[
      { label: 'Title', name: 'title', type: 'text' },
      { label: 'Content', name: 'content', type: 'textarea' },
      { label: 'Training Date & Time', name: 'datetime', type: 'datetime-local' },
    ]} onClose={onClose} />
  ),
  'Research Opportunities': ({ onClose, category, audience }) => (
    <ModalForm title="Research Opportunities Notice" category={category} audience={audience} fields={[
      { label: 'Title', name: 'title', type: 'text' },
      { label: 'Content', name: 'content', type: 'textarea' },
      { label: 'Deadline Date', name: 'date', type: 'date' },
    ]} onClose={onClose} />
  ),
  'Staff Achievements': ({ onClose, category, audience }) => (
    <ModalForm title="Staff Achievements Notice" category={category} audience={audience} fields={[
      { label: 'Title', name: 'title', type: 'text' },
      { label: 'Content', name: 'content', type: 'textarea' },
    ]} onClose={onClose} />
  ),
  'Maintenance Notices': ({ onClose, category, audience }) => (
    <ModalForm title="Maintenance Notices" category={category} audience={audience} fields={[
      { label: 'Title', name: 'title', type: 'text' },
      { label: 'Content', name: 'content', type: 'textarea' },
      { label: 'Maintenance Date', name: 'date', type: 'date' },
    ]} onClose={onClose} />
  ),
  'IT & System Updates': ({ onClose, category, audience }) => (
    <ModalForm title="IT & System Updates" category={category} audience={audience} fields={[
      { label: 'Title', name: 'title', type: 'text' },
      { label: 'Content', name: 'content', type: 'textarea' },
      { label: 'Update Date', name: 'date', type: 'date' },
    ]} onClose={onClose} />
  ),

  // All Users Categories
  'Holiday Announcement': ({ onClose, category, audience }) => (
    <ModalForm title="Holiday Announcement" category={category} audience={audience} fields={[
      { label: 'Title', name: 'title', type: 'text' },
      { label: 'Content', name: 'content', type: 'textarea' },
      { label: 'Date', name: 'date', type: 'date' },
    ]} onClose={onClose} />
  ),
  'Exam Timetable': ({ onClose, category, audience }) => (
    <ModalForm title="Exam Timetable" category={category} audience={audience} fields={[
      { label: 'Title', name: 'title', type: 'text' },
      { label: 'Content', name: 'content', type: 'textarea' },
      { label: 'Exam Date', name: 'date', type: 'date' },
    ]} onClose={onClose} />
  ),
  'Events': ({ onClose, category, audience }) => (
    <ModalForm title="Events Notice" category={category} audience={audience} fields={[
      { label: 'Title', name: 'title', type: 'text' },
      { label: 'Content', name: 'content', type: 'textarea' },
      { label: 'Event Date', name: 'date', type: 'date' },
    ]} onClose={onClose} />
  ),
  'Results': ({ onClose, category, audience }) => (
    <ModalForm title="Results Notice" category={category} audience={audience} fields={[
      { label: 'Title', name: 'title', type: 'text' },
      { label: 'Content', name: 'content', type: 'textarea' },
      { label: 'Publish Date', name: 'date', type: 'date' },
    ]} onClose={onClose} />
  ),
  'Fee Notices': ({ onClose, category, audience }) => (
    <ModalForm title="Fee Notices" category={category} audience={audience} fields={[
      { label: 'Title', name: 'title', type: 'text' },
      { label: 'Content', name: 'content', type: 'textarea' },
      { label: 'Due Date', name: 'date', type: 'date' },
    ]} onClose={onClose} />
  ),
  'Emergency Alerts': ({ onClose, category, audience }) => (
    <ModalForm title="Emergency Alerts" category={category} audience={audience} fields={[
      { label: 'Title', name: 'title', type: 'text' },
      { label: 'Content', name: 'content', type: 'textarea' },
    ]} onClose={onClose} />
  ),
  'Workshops / Seminars': ({ onClose, category, audience }) => (
    <ModalForm title="Workshops / Seminars" category={category} audience={audience} fields={[
      { label: 'Title', name: 'title', type: 'text' },
      { label: 'Content', name: 'content', type: 'textarea' },
      { label: 'Date', name: 'date', type: 'date' },
    ]} onClose={onClose} />
  ),
  'Scholarship / Grants': ({ onClose, category, audience }) => (
    <ModalForm title="Scholarship / Grants" category={category} audience={audience} fields={[
      { label: 'Title', name: 'title', type: 'text' },
      { label: 'Content', name: 'content', type: 'textarea' },
      { label: 'Deadline', name: 'date', type: 'date' },
    ]} onClose={onClose} />
  ),
  'Campus News': ({ onClose, category, audience }) => (
    <ModalForm title="Campus News" category={category} audience={audience} fields={[
      { label: 'Title', name: 'title', type: 'text' },
      { label: 'Content', name: 'content', type: 'textarea' },
    ]} onClose={onClose} />
  ),
  'Sports / Cultural Updates': ({ onClose, category, audience }) => (
    <ModalForm title="Sports / Cultural Updates" category={category} audience={audience} fields={[
      { label: 'Title', name: 'title', type: 'text' },
      { label: 'Content', name: 'content', type: 'textarea' },
      { label: 'Event Date', name: 'date', type: 'date' },
    ]} onClose={onClose} />
  ),
};

// === Modal Form Component ===
const ModalForm = ({ title, category, audience, fields, onClose }) => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Validate that at least title or content is provided
      if (!formData.title && !formData.content) {
        setError('Either title or content must be provided.');
        setLoading(false);
        return;
      }

      // Prepare notice data
      const noticeData = {
        category: category,
        audience: audience,
        // Convert empty strings to null for optional fields
        title: formData.title || null,
        content: formData.content || null,
        date: formData.date || null,
        datetime: formData.datetime || null,
        priority: formData.priority || 'normal',
      };

      const response = await createNotice(noticeData);
      setSuccess(response.message || 'Notice created successfully!');
      
      // Reset form and close after 2 seconds
      setTimeout(() => {
        setFormData({});
        onClose();
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to create notice. Please check all fields.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {fields.map((field, idx) => (
            <div className="form-group" key={idx}>
              <label>{field.label} {field.type !== 'select' && !field.name.includes('content') && <span className="required">*</span>}</label>
              {field.type === 'textarea' ? (
                <textarea 
                  name={field.name} 
                  value={formData[field.name] || ''} 
                  onChange={handleChange}
                  rows="4"
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                />
              ) : field.type === 'select' ? (
                <select name={field.name} value={formData[field.name] || ''} onChange={handleChange} required>
                  <option value="">Select {field.label}</option>
                  {field.options.map((opt, i) => <option key={i} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>)}
                </select>
              ) : (
                <input 
                  type={field.type} 
                  name={field.name} 
                  value={formData[field.name] || ''} 
                  onChange={handleChange}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  required={field.name === 'title'}
                />
              )}
            </div>
          ))}
          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-cancel" disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Notice'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// === Main AddNotice Component (Your previous code intact) ===
const AddNotice = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const staffCategories = [
    { id: 1, name: 'Staff Meeting', icon: '👥' },
    { id: 2, name: 'Invigilation Duty', icon: '📋' },
    { id: 3, name: 'Internal Circular', icon: '📄' },
    { id: 4, name: 'Timetable Work', icon: '📅' },
    { id: 5, name: 'Leave / Policy Update', icon: '📝' },
    { id: 6, name: 'Faculty Training', icon: '🎓' },
    { id: 7, name: 'Research Opportunities', icon: '🔬' },
    { id: 8, name: 'Staff Achievements', icon: '🏆' },
    { id: 9, name: 'Maintenance Notices', icon: '🛠️' },
    { id: 10, name: 'IT & System Updates', icon: '💻' },
  ];

  const allUsersCategories = [
    { id: 1, name: 'Holiday Announcement', icon: '🎉' },
    { id: 2, name: 'Exam Timetable', icon: '📚' },
    { id: 3, name: 'Events', icon: '🎪' },
    { id: 4, name: 'Results', icon: '📊' },
    { id: 5, name: 'Fee Notices', icon: '💰' },
    { id: 6, name: 'Emergency Alerts', icon: '🚨' },
    { id: 7, name: 'Workshops / Seminars', icon: '📝' },
    { id: 8, name: 'Scholarship / Grants', icon: '🎓' },
    { id: 9, name: 'Campus News', icon: '🏫' },
    { id: 10, name: 'Sports / Cultural Updates', icon: '⚽' },
  ];

  const handleTypeSelect = (type) => setSelectedType(type);
  const handleBack = () => setSelectedType(null);
  const handleCategorySelect = (category) => setSelectedCategory(category);

  if (selectedType) {
    const categories = selectedType === 'staff' ? staffCategories : allUsersCategories;
    const typeLabel = selectedType === 'staff' ? 'Staff Notice' : 'All Users Notice';

    const FormComponent = selectedCategory ? formsByCategory[selectedCategory.name] : null;

    return (
      <div className="notice-container">
        <div className="notice-header">
          <button onClick={handleBack} className="back-button">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </button>
          <div>
            <h1 className="page-title">Select Category</h1>
            <p className="page-subtitle">{typeLabel} Categories</p>
          </div>
        </div>

        <div className="categories-grid">
          {categories.map((category) => (
            <div
              key={category.id}
              className="category-card"
              onClick={() => handleCategorySelect(category)}
            >
              <div className="category-icon">{category.icon}</div>
              <div className="category-name">{category.name}</div>
            </div>
          ))}
        </div>

        {selectedCategory && FormComponent && (
          <FormComponent 
            onClose={() => setSelectedCategory(null)}
            category={selectedCategory.name}
            audience={selectedType}
          />
        )}
      </div>
    );
  }

  return (
    <div className="notice-container">
      <div className="notice-type-screen">
        <h1 className="main-title">Choose Notice Type</h1>
        
        <div className="notice-type-buttons">
          <button
            className="notice-type-btn staff-notice"
            onClick={() => handleTypeSelect('staff')}
          >
            <div className="btn-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="btn-content">
              <h2 className="btn-title">Staff Notices</h2>
              <p className="btn-subtitle">Internal notices for staff members</p>
            </div>
            <div className="btn-arrow">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>

          <button
            className="notice-type-btn all-users-notice"
            onClick={() => handleTypeSelect('all')}
          >
            <div className="btn-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="btn-content">
              <h2 className="btn-title">All Users Notices</h2>
              <p className="btn-subtitle">Public notices for everyone</p>
            </div>
            <div className="btn-arrow">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNotice;
