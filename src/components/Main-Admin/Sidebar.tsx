import React, { useState } from 'react';
import { NavLink} from 'react-router-dom';
import { Menu, X, Home, Plus, LogOut } from 'lucide-react';
import { useAuth } from '../MainAdminContext/MainAuthContexts';
import '../../styles/MainAdmin.css';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
 

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <div className="sidebar-header-mobile">
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
        <h1 className="sidebar-title-mobile">Restaurant Admin</h1>
      </div>

      <div className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-container">
          <div className="sidebar-header">
            <h1 className="sidebar-title">Restaurant Admin</h1>
            <button className="sidebar-close" onClick={toggleSidebar}>
              <X size={24} />
            </button>
          </div>
          
          <div className="sidebar-content">
            <nav className="sidebar-nav">
              <NavLink 
                to="/main-admin" 
                className={({ isActive }) => 
                  `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
                }
                onClick={() => setIsOpen(false)}
              >
                <Home size={20} className="sidebar-icon" />
                Dashboard
              </NavLink>
              
              <NavLink 
                to="/main-admin/add-restaurant" 
                className={({ isActive }) => 
                  `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
                }
                onClick={() => setIsOpen(false)}
              >
                <Plus size={20} className="sidebar-icon" />
                Add Restaurant
              </NavLink>
            </nav>
          </div>
          
          <div className="sidebar-footer">
            <button className="sidebar-logout" onClick={handleLogout}>
              <LogOut size={20} className="sidebar-icon" />
              Logout
            </button>
          </div>
        </div>
        
        <div 
          className={`sidebar-overlay ${isOpen ? 'sidebar-overlay-open' : ''}`}
          onClick={toggleSidebar}
        />
      </div>
    </>
  );
};

export default Sidebar;