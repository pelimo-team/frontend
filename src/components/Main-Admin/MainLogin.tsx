import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';
import { useAuth } from '../MainAdminContext/MainAuthContexts';
import '../../styles/MainAdmin.css'

const MainLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { login, isAuthenticated, error: authError } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/main-admin');
    }
  }, [isAuthenticated, navigate]);
  
  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }
    
    setIsLoading(true);
    try {
      const success = await login(username, password);
      if (success) {
        navigate('/');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">Restaurant Admin</h1>
          <p className="login-subtitle">Login to access the admin panel</p>
        </div>
        
        {error && (
          <div className="login-error">
            {error}
          </div>
        )}
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <div className="login-input-container">
              <div className="login-input-icon">
                <User size={18} />
              </div>
              <input
                type="text"
                id="username"
                className="form-input login-input"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter your username"
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="login-input-container">
              <div className="login-input-icon">
                <Lock size={18} />
              </div>
              <input
                type="password"
                id="password"
                className="form-input login-input"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                disabled={isLoading}
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            className={`btn login-button ${isLoading ? 'login-button-loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="login-footer">
          <p>Use username: 09001382928 and password: admin123</p>
        </div>
      </div>
    </div>
  );
};

export default MainLogin;