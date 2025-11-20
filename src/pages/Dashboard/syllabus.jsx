import React, { useState, useEffect } from "react";
import {
  FiPlus,
  FiSearch,
  FiX,
  FiChevronDown,
  FiFileText,
  FiLoader,
} from "react-icons/fi";
import { 
  getSubjects, 
  createSubject, 
  getSyllabi,
  createOrUpdateSyllabus,
  updateSyllabus,
  deleteSyllabus
} from "../../services/api";
import "./syllabus.css";



const DEPARTMENTS = ["CSE", "IT", "ECE", "EEE", "MECH", "CIVIL"];
const SEMESTERS = ["1", "2", "3", "4", "5", "6", "7", "8"];

const SyllabusPage = () => {
  const [syllabus, setSyllabus] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSubjectsModal, setShowSubjectsModal] = useState(false);
  const [subjectsFilter, setSubjectsFilter] = useState({
    department: '',
    semester: '',
    search: ''
  });

  const [filters, setFilters] = useState({
    department: "",
    semester: "",
    search: "",
  });

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newSyllabus, setNewSyllabus] = useState({
    department: "",
    semester: "",
    subject: "",
    pdf_url: "",
  });
  
  const [uploadData, setUploadData] = useState({
    subject_code: "",
    subject_id: "",
    pdf_url: ""
  });
  
  const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);
  const [uploadFilteredCodes, setUploadFilteredCodes] = useState([]);

  // Process and transform subjects data
  const processSubjectsData = (response) => {
    // Check if response is an array, if not, use response.results or response.data if they exist
    let subjectsData = Array.isArray(response) 
      ? response 
      : response?.results || response?.data || [];
      
    // Transform the response to match the expected format
    return subjectsData.map(subject => ({
      id: subject.id,
      subject: subject.name || subject.subject,
      code: subject.subject_code || subject.code || '',
      department: subject.department || '',
      semester: subject.semester ? subject.semester.toString() : '',
      pdf_url: subject.syllabus?.pdf_url || subject.pdf_url || '',
      name: subject.name || subject.subject // For backward compatibility
    }));
  };

  // Fetch subjects from backend
  const fetchAndProcessSubjects = async () => {
    try {
      const response = await getSubjects();
      const processedSubjects = processSubjectsData(response);
      setSyllabus(processedSubjects);
      setFiltered(processedSubjects);
      return processedSubjects;
    } catch (error) {
      alert('Failed to load subjects. Please try again later.');
      throw error; // Re-throw to allow error handling in the calling function
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchAndProcessSubjects();
  }, []);

  // Filtering logic
  useEffect(() => {
    let result = syllabus;

    if (filters.department)
      result = result.filter((item) => item.department === filters.department);

    if (filters.semester)
      result = result.filter((item) => item.semester === filters.semester);

    if (filters.search)
      result = result.filter(
        (item) =>
          item.subject.toLowerCase().includes(filters.search.toLowerCase()) 
      );

    setFiltered(result);
  }, [filters, syllabus]);

  const isValidPdfUrl = (url) => {
    try {
      new URL(url); // checks valid URL format
      return url.toLowerCase().endsWith('.pdf'); // must end with .pdf
    } catch {
      return false; // invalid URL
    }
  };

  // In syllabus.jsx, add this function
const handleUploadChange = (e) => {
  const { name, value } = e.target;
  setUploadData(prev => ({
    ...prev,
    [name]: value
  }));
};

  // Handle upload form changes
const handleUploadSubmit = async (e) => {
  
  e.preventDefault();
  if (!uploadData.subject_id || !uploadData.pdf_url) {
    alert('Please select a subject and enter a PDF URL');
    return;
  }


  try {
    setIsSubmitting(true);
    
    // Check if the subject already has a syllabus
    const existingSyllabus = syllabus.find(s => s.id === parseInt(uploadData.subject_id));
    
    let response;
    
    const hasValidPdf = existingSyllabus && 
  existingSyllabus.pdf_url && 
  existingSyllabus.pdf_url !== '#' && 
  existingSyllabus.pdf_url !== '';

if (hasValidPdf) {
  // Update existing syllabus
  response = await updateSyllabus(
    existingSyllabus.id,  // Changed from syllabus_id to id
    uploadData.pdf_url
  );
} else {
  // Create new syllabus
  response = await createOrUpdateSyllabus(
    uploadData.subject_id,
    uploadData.pdf_url
  );
}
    
    alert('Syllabus uploaded successfully!');
    setShowUploadModal(false);
    setUploadData({ subject_id: '', pdf_url: '' });
    
    // Refresh the syllabus list
    await fetchAndProcessSubjects();
    
  } catch (error) {
    alert(`Failed to upload syllabus: ${error.message || 'Please try again'}`);
  } finally {
    setIsSubmitting(false);
  }
};
  // Handle subject selection from the subjects modal
  const handleSubjectSelect = (subject) => {
    setNewSyllabus(prev => ({
      ...prev,
      subject: subject.subject || subject.name, // Handle both formats
      department: subject.department,
      semester: subject.semester.toString()
    }));
    setShowSubjectsModal(false);
  };


  // Handle form submission
  const handleAddSyllabus = async () => {
    if (
      !newSyllabus.subject ||
      !newSyllabus.department ||
      !newSyllabus.semester 
    ) {
      alert("Please fill all required fields");
      return;
    }

    if (newSyllabus.pdf_url && !isValidPdfUrl(newSyllabus.pdf_url)) {
      alert("Invalid PDF URL. Make sure the link is correct and ends with .pdf");
      return;
    }

    setIsSubmitting(true);

    try {
      const subjectData = {
        name: newSyllabus.subject,
        department: newSyllabus.department,
        semester: parseInt(newSyllabus.semester),
        pdf_url: newSyllabus.pdf_url || null,
      };
      const response = await createSubject(subjectData);
      
      
      // Close modal and reset form
      setShowModal(false);
      setNewSyllabus({
        department: "",
        semester: "",
        subject: "",
        pdf_url: "",
      });

      alert("Subject created successfully!");
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create subject. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get unique subject codes from syllabus
  const subjectCodes = [...new Set(syllabus.map(item => item.code))].sort();

  // Initialize uploadFilteredCodes with all subject codes when syllabus changes
  useEffect(() => {
    if (syllabus.length > 0) {
      const codes = [...new Set(syllabus.map(item => item.code))].sort();
      setUploadFilteredCodes(codes);
    }
  }, [syllabus]);
  
  // Filter subjects based on current filters
  const filteredSubjects = syllabus.filter(subject => {
    if (subjectsFilter.department && subject.department !== subjectsFilter.department) return false;
    if (subjectsFilter.semester && subject.semester !== subjectsFilter.semester) return false;
    if (subjectsFilter.search && !subject.subject.toLowerCase().includes(subjectsFilter.search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="page-container">
      {/* Subjects Modal */}
      {showSubjectsModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '800px', maxHeight: '80vh' }}>
            <div className="modal-header">
              <h3>All Subjects</h3>
              <button className="close-btn" onClick={() => setShowSubjectsModal(false)}>
                <FiX size={24} />
              </button>
            </div>
            
            <div className="modal-body" style={{ padding: '1.5rem' }}>
              {/* Filters */}
              <div className="filter-grid" style={{ marginBottom: '1.5rem' }}>
                <div className="filter-item">
                  <label>Department</label>
                  <div className="select-box">
                    <select
                      value={subjectsFilter.department}
                      onChange={(e) => setSubjectsFilter(prev => ({ ...prev, department: e.target.value }))}
                    >
                      <option value="">All Departments</option>
                      {DEPARTMENTS.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                    <FiChevronDown className="select-icon" />
                  </div>
                </div>

                <div className="filter-item">
                  <label>Semester</label>
                  <div className="select-box">
                    <select
                      value={subjectsFilter.semester}
                      onChange={(e) => setSubjectsFilter(prev => ({ ...prev, semester: e.target.value }))}
                    >
                      <option value="">All Semesters</option>
                      {SEMESTERS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <FiChevronDown className="select-icon" />
                  </div>
                </div>

                <div className="filter-item">
                  <label>Search</label>
                  <div className="search-box">
                    <FiSearch className="search-icon" />
                    <input
                      type="text"
                      placeholder="Search subjects..."
                      value={subjectsFilter.search}
                      onChange={(e) => setSubjectsFilter(prev => ({ ...prev, search: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              {/* Subjects List */}
              <div className="subjects-list" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {filteredSubjects.length > 0 ? (
                  <table className="data-table" style={{ width: '100%' }}>
                    <thead>
                      <tr>
                        <th>Subject</th>
                        <th>Code</th>
                        <th>Department</th>
                        <th>Semester</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSubjects.map((subject) => (
                        <tr key={subject.id}>
                          <td>{subject.subject}</td>
                          <td>{subject.code}</td>
                          <td>{subject.department}</td>
                          <td>{subject.semester}</td>
                          
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="no-results">No subjects found matching your criteria.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}


      {/* HEADER */}
      <div className="page-header">
        <div>
          <h2 className="page-title">Syllabus</h2>
          <p className="page-subtitle">{filtered.length} syllabus found</p>
        </div>

        <div className="header-actions">
          <button 
            className="btn btn-primary" 
            onClick={() => setShowModal(true)}
          >
            <FiPlus size={18} /> Add Subject
          </button>
          <button 
            className="btn btn-outline"
            onClick={() => setShowUploadModal(true)}
            style={{ marginRight: '10px' }}
          >
            <FiFileText size={18} /> Upload Syllabus
          </button>
          <button 
            className="btn btn-outline"
            onClick={() => setShowSubjectsModal(true)}
          >
            <FiSearch size={18} /> View All Subjects
          </button>
        </div>
      </div>

      {/* FILTER BOX */}
      <div className="filter-box">
        <div className="filter-grid">

          {/* Department */}
          <div className="filter-item">
            <label>Department</label>
            <div className="select-box">
              <select
                value={filters.department}
                onChange={(e) =>
                  setFilters({ ...filters, department: e.target.value })
                }
              >
                <option value="">All Departments</option>
                {DEPARTMENTS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <FiChevronDown className="select-icon" />
            </div>
          </div>

          {/* Semester */}
          <div className="filter-item">
            <label>Semester</label>
            <div className="select-box">
              <select
                value={filters.semester}
                onChange={(e) =>
                  setFilters({ ...filters, semester: e.target.value })
                }
              >
                <option value="">All Semesters</option>
                {SEMESTERS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <FiChevronDown className="select-icon" />
            </div>
          </div>

          {/* Search */}
          <div className="filter-item">
            <label>Search</label>
            <div className="search-box">
              <FiSearch />
              <input
                type="text"
                placeholder="Search subject or code..."
                value={filters.search}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
              />
            </div>
          </div>

          {/* Clear Button */}
          <div className="filter-clear">
            <button
              className="btn-clear"
              onClick={() =>
                setFilters({ department: "", semester: "", search: "" })
              }
            >
              <FiX /> Clear all filters
            </button>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Subject</th>
              <th>Code</th>
              <th>Department</th>
              <th>Semester</th>
              <th>PDF_URL</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.subject}</td>
                <td>{item.code}</td>
                <td>{item.department}</td>
                <td>{item.semester}</td>
                <td>{ (item.pdf_url) &&
                  <a href={item.pdf_url} className="pdf-link">
                    <FiFileText /> View
                  </a>
                }
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan="6" className="no-data">
                  No syllabus found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ADD SYLLABUS MODAL */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Add New Subject</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                <FiX />
              </button>
            </div>

            <div className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Department <span className="required">*</span></label>
                  <div className="select-box">
                    <select
                      value={newSyllabus.department}
                      onChange={(e) =>
                        setNewSyllabus({ ...newSyllabus, department: e.target.value })
                      }
                      required
                    >
                      <option value="">Select Department</option>
                      {DEPARTMENTS.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                    <FiChevronDown className="select-icon" />
                  </div>
                </div>

                <div className="form-group">
                  <label>Semester <span className="required">*</span></label>
                  <div className="select-box">
                    <select
                      value={newSyllabus.semester}
                      onChange={(e) =>
                        setNewSyllabus({ ...newSyllabus, semester: e.target.value })
                      }
                      required
                    >
                      <option value="">Select Semester</option>
                      {SEMESTERS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <FiChevronDown className="select-icon" />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Subject Name <span className="required">*</span></label>
                  <input
                    type="text"
                    placeholder="e.g., Data Structures"
                    value={newSyllabus.subject}
                    onChange={(e) =>
                      setNewSyllabus({ ...newSyllabus, subject: e.target.value })
                    }
                    required
                  />
                </div>

                
              </div>

              <div className="form-group">
                <label>Syllabus PDF</label>
                <div className="file-upload">
                  <input
                    type="url"
                    placeholder="Enter PDF URL or upload file"
                    value={newSyllabus.pdf_url}
                    onChange={(e) =>
                      setNewSyllabus({ ...newSyllabus, pdf_url: e.target.value })
                    }
                  />
                  <button 
                    className="btn btn-outline" 
                    type="button"
                    onClick={() => alert('File upload functionality will be implemented here')}
                  >
                    Browse
                  </button>
                </div>
                <small className="hint">Supported formats: .pdf, .doc, .docx</small>
              </div>
            </div>

            <div className="modal-actions">
              <button 
                className="btn btn-outline" 
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-primary" 
                onClick={handleAddSyllabus}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <FiLoader className="spin" /> Saving...
                  </>
                ) : (
                  'Save Subject'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Syllabus Modal */}
      {showUploadModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '500px' }}>
            <div className="modal-header">
              <h3>Upload Syllabus</h3>
              <button className="close-btn" onClick={() => setShowUploadModal(false)}>
                <FiX size={24} />
              </button>
            </div>
            
            <div className="modal-body" style={{ padding: '1.5rem' }}>
              <form onSubmit={handleUploadSubmit}>
                <div className="form-group" style={{ marginBottom: '1rem', position: 'relative' }}>
  <label htmlFor="subject_code" style={{ display: 'block', marginBottom: '0.5rem' }}>
    Subject Code
  </label>

  <input
    type="text"
    id="subject_code"
    name="subject_code"
    className="form-control"
    placeholder="Type or select subject code"
    value={uploadData.subject_code}
    autoComplete="off"
    onChange={(e) => {
      const value = e.target.value;
      setUploadData(prev => ({
        ...prev,
        subject_code: value,
        subject_id: '' // clear id when typing
      }));

      // Filter subject codes based on input
      console.log('Filtering codes for:', value);
      const filtered = subjectCodes.filter(code => {
        const matches = code && code.toLowerCase().includes(value.toLowerCase());
        console.log(`Code: ${code}, matches: ${matches}`);
        return matches;
      });
      console.log('Filtered codes:', filtered);
      setUploadFilteredCodes(filtered);
      setShowSubjectDropdown(true);
      console.log('showSubjectDropdown set to:', true);
    }}
    onFocus={() => setShowSubjectDropdown(true)}
    onBlur={() => setTimeout(() => setShowSubjectDropdown(false), 200)}
    required
  />

  {/* Dropdown toggle icon */}
  <FiChevronDown 
    className="select-icon" 
    style={{ 
      cursor: 'pointer', 
      position: 'absolute', 
      right: '10px', 
      top: '50%', 
      transform: 'translateY(-50%)',
      pointerEvents: 'auto',
      zIndex: 10000
    }}
    onMouseDown={(e) => {
      e.preventDefault();
      e.stopPropagation();
      setShowSubjectDropdown(!showSubjectDropdown);
    }}
  />

  {/* Dropdown list */}
  {console.log('Rendering dropdown. showSubjectDropdown:', showSubjectDropdown, 'filtered count:', uploadFilteredCodes.length)}
  {showSubjectDropdown && (
    <div style={{
      position: 'absolute',
      top: 'calc(100% + 5px)',
      left: 0,
      right: 0,
      zIndex: 9999,
      backgroundColor: 'white',
      border: '1px solid #ddd',
      borderRadius: '4px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
      maxHeight: '250px',
      overflowY: 'auto',
      marginTop: '4px'
    }}>
      {uploadFilteredCodes.length > 0 ? (
        uploadFilteredCodes.map((code) => {
          const subject = syllabus.find(s => s.code === code); // get full subject info
          return (
            <div
              key={code}
              style={{
                padding: '8px 12px',
                cursor: 'pointer',
                borderBottom: '1px solid #eee',
                backgroundColor: uploadData.subject_code === code ? '#f0f7ff' : 'white'
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                setUploadData({
                  ...uploadData,
                  subject_code: code,
                  subject_id: subject?.id || ''
                });
                setShowSubjectDropdown(false);
              }}
            >
              <div><strong>{code}</strong></div>
              {subject && (
                <small style={{ color: '#666' }}>
                  {subject.subject} - {subject.department} (Sem {subject.semester})
                </small>
              )}
            </div>
          );
        })
      ) : (
        <div style={{ padding: '8px 12px', color: '#666', fontStyle: 'italic' }}>
          No matching subject codes found
        </div>
      )}
    </div>
  )}
</div>


                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label htmlFor="pdf_url" style={{ display: 'block', marginBottom: '0.5rem' }}>
                    PDF URL
                  </label>
                  <input
                    type="url"
                    id="pdf_url"
                    name="pdf_url"
                    className="form-control"
                    value={uploadData.pdf_url}
                    onChange={handleUploadChange}
                    placeholder="Enter PDF URL"
                    required
                  />
                </div>

                <div className="form-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                  <button 
                    type="button" 
                    className="btn btn-outline"
                    onClick={() => setShowUploadModal(false)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Uploading...' : 'Upload'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SyllabusPage;
