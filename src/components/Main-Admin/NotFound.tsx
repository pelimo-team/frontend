import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import '../../styles/MainAdmin.css'

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="not-found">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-message">Oops! The page you're looking for doesn't exist.</p>
        <button 
          className="btn btn-primary not-found-button"
          onClick={() => navigate('/main-admin')}
        >
          <Home size={18} className="btn-icon" />
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default NotFound;