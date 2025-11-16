const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

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
  
  return response.json();
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

