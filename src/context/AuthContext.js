import React, { createContext, useState, useEffect, useContext } from 'react';
import { getUser, removeTokens, refreshToken, getProfile } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        const storedUser = getUser();
        if (storedUser) {
          // Verify token is still valid by fetching profile
          try {
            const profile = await getProfile();
            setUser(profile);
            setIsAuthenticated(true);
          } catch (error) {
            // Token might be expired, try to refresh
            try {
              await refreshToken();
              const profile = await getProfile();
              setUser(profile);
              setIsAuthenticated(true);
            } catch (refreshError) {
              // Refresh failed, logout
              logout();
            }
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    removeTokens();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

