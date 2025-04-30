import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
        setUser(null);
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      const response = await fetch('http://127.0.0.1:8000/api/accounts/check-auth/', {
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Token ${storedToken}`
        }
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('token');
      }
    } catch (err) {
      console.error('Auth check failed:', err);
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (phone_number, password) => {
    try {
      const csrfResponse = await fetch("http://127.0.0.1:8000/api/accounts/csrf/", {
        credentials: "include",
      });
      const csrfToken = csrfResponse.headers.get("X-CSRFToken");
      localStorage.setItem("X-CSRFToken", csrfToken);
      
      const response = await fetch("http://127.0.0.1:8000/api/accounts/login/", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify({
          phone_number,
          password,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setUser(data.user);
        setIsAuthenticated(true);
        setToken(data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        return { success: true };
      } else {
        return { success: false, error: data.error || "Invalid credentials" };
      }
    } catch (err) {
      console.error("Login error:", err);
      return { success: false, error: "Something went wrong. Please try again." };
    }
  };

  const logout = async () => {
    try {
      const storedToken = localStorage.getItem('token');
      await fetch("http://127.0.0.1:8000/api/accounts/logout/", {
        method: "POST",
        credentials: 'include',
        headers: {
          'Authorization': `Token ${storedToken}`
        }
      });
      setUser(null);
      setIsAuthenticated(false);
      setToken(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    token,
    login,
    logout,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 