import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../components/MainAdminContext/MainAuthContexts';
import MainLogin from '../components/Main-Admin/MainLogin';
import Dashboard from '../components/Main-Admin/DashBoard';
import AddRestaurant from '../components/Main-Admin/AddRestaurant';
import EditRestaurant from '../components/Main-Admin/EditRestaurant';
import NotFound from '../components/Main-Admin/NotFound';
import '../styles/MainAdmin.css';

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/main-login" replace />;
  }
  
  return <>{children}</>;
};

function MainAdmin() {
  return (
    <AuthProvider>
      <div className="app">
        <Routes>
          <Route path="/main-login" element={<MainLogin />} />
          <Route 
            path="/main-admin" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/add-restaurant" 
            element={
              <ProtectedRoute>
                <AddRestaurant />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/edit-restaurant/:id" 
            element={
              <ProtectedRoute>
                <EditRestaurant />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default MainAdmin;