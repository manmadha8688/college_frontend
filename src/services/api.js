const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://college-backend-1-ob7d.onrender.com';

// Get stored tokens
export const getTokens = () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  return { accessToken, refreshToken };
};

// Store tokens
export const setTokens = (accessToken, refreshToken) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

// Remove tokens
export const removeTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
};

// Get stored user
export const getUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

// Store user
export const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

// API request helper
export const apiRequest = async (endpoint, options = {}) => {
  const { accessToken } = getTokens();
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'An error occurred' }));
    throw new Error(error.error || error.detail || 'Request failed');
  }
  
  // Handle 204 No Content responses (DELETE operations)
  if (response.status === 204 || response.statusText === 'No Content') {
    return { message: 'Operation completed successfully' };
  }
  
  // Try to parse JSON response, return empty object if no content
  try {
    const text = await response.text();
    if (text && text.trim()) {
      return JSON.parse(text);
    }
    return { message: 'Operation completed successfully' };
  } catch (e) {
    // If JSON parsing fails, return success message
    return { message: 'Operation completed successfully' };
  }
};

// Login API
export const login = async (email, password) => {
  const data = await apiRequest('/api/auth/login/', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  
  if (data.tokens) {
    setTokens(data.tokens.access, data.tokens.refresh);
    setUser(data.user);
  }
  
  return data;
};

// Register API (optional, if needed)
export const register = async (userData) => {
  const data = await apiRequest('/api/auth/register/', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
  
  if (data.tokens) {
    setTokens(data.tokens.access, data.tokens.refresh);
    setUser(data.user);
  }
  
  return data;
};

// Get user profile
export const getProfile = async () => {
  return apiRequest('/api/auth/profile/');
};

// Refresh token
export const refreshToken = async () => {
  const { refreshToken } = getTokens();
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }
  
  const data = await apiRequest('/api/auth/token/refresh/', {
    method: 'POST',
    body: JSON.stringify({ refresh: refreshToken }),
  });
  
  if (data.access) {
    const { refreshToken: oldRefresh } = getTokens();
    setTokens(data.access, data.refresh || oldRefresh);
  }
  
  return data;
};

// Add Student API
export const addStudent = async (studentData) => {
  return apiRequest('/api/auth/add-student/', {
    method: 'POST',
    body: JSON.stringify(studentData),
  });
};

// Add Staff API
export const addStaff = async (staffData) => {
  return apiRequest('/api/auth/add-staff/', {
    method: 'POST',
    body: JSON.stringify(staffData),
  });
};

// Create Notice API
export const createNotice = async (noticeData) => {
  return apiRequest('/api/notices/create/', {
    method: 'POST',
    body: JSON.stringify(noticeData),
  });
};

// Get Notices API
export const getNotices = async () => {
  return apiRequest('/api/notices/');
};

// List Students API (Admin only)
export const getStudents = async () => {
  return apiRequest('/api/auth/students/');
};

// List Staff API (Admin only)
export const getStaff = async () => {
  return apiRequest('/api/auth/staff/');
};

// Update Notice API
export const updateNotice = async (noticeId, noticeData) => {
  return apiRequest(`/api/notices/manage/${noticeId}/`, {
    method: 'PATCH',
    body: JSON.stringify(noticeData),
  });
};

// Delete Notice API
export const deleteNotice = async (noticeId) => {
  return apiRequest(`/api/notices/manage/${noticeId}/`, {
    method: 'DELETE',
  });
};

// Update Student API
export const updateStudent = async (studentId, studentData) => {
  return apiRequest(`/api/auth/students/${studentId}/`, {
    method: 'PATCH',
    body: JSON.stringify(studentData),
  });
};

// Delete Student API
export const deleteStudent = async (studentId) => {
  return apiRequest(`/api/auth/students/${studentId}/`, {
    method: 'DELETE',
  });
};

// Update Staff API
export const updateStaff = async (staffId, staffData) => {
  return apiRequest(`/api/auth/staff/${staffId}/`, {
    method: 'PATCH',
    body: JSON.stringify(staffData),
  });
};

// Delete Staff API
export const deleteStaff = async (staffId) => {
  return apiRequest(`/api/admin/staff/${staffId}/`, {
    method: 'DELETE',
  });
};

// In api.js, add this function to get department subjects for a student
export const getDepartmentSubjects = async (department) => {
  
  return apiRequest(`/api/syllabus/department/${department}/`, {
      method: 'GET',
    });
    
};

// Syllabus API
export const getSubjects = async () => {
  return apiRequest('/api/syllabus/subjects/');
};

export const createSubject = async (subjectData) => {
  return apiRequest('/api/syllabus/subjects/', {
    method: 'POST',
    body: JSON.stringify(subjectData)
  });
};



// In api.js, add this line to the exports
export const createOrUpdateSyllabus = async (subjectId, pdfUrl) => {
  return apiRequest(`/api/syllabus/syllabus/`, {
    method: 'POST',
    body: JSON.stringify({ subject: subjectId, pdf_url: pdfUrl }),
  });
};

// Update a syllabus
export const updateSyllabus = async (id, pdfUrl) => {
  return await apiRequest(`/api/syllabus/syllabus/${id}/`, {
    method: 'PUT',
    body: JSON.stringify({
      pdf_url: pdfUrl
    }),
  });
};

// Delete a syllabus
export const deleteSyllabus = async (id) => {
  return await apiRequest(`/api/syllabus/${id}/`, {
    method: 'DELETE',
  });
};

// Assign HOD API
export const assignHOD = async (staffId, hodData) => {
  return apiRequest('/api/auth/hods/', {
    method: 'POST',
    body: JSON.stringify({
      staff: staffId,  // This is the primary key of the Staff model
      department: hodData.department,  // Make sure this is a valid department code (e.g., "IT")
      additional_responsibilities: hodData.additional_responsibilities || '',
      is_active: true,
      start_date: new Date().toISOString().split('T')[0]
    })
  });
};

export const getHODs = async () => {
  return apiRequest('/api/auth/hods/');
};

