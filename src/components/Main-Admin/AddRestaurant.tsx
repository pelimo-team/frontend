import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Sidebar from './Sidebar';
import RestaurantForm from './RestaurantForm';
import Alert from './Alert';
import { useRestaurants } from '../MainAdminContext/RestaurantContext';
import '../../styles/MainAdmin.css'

const AddRestaurant: React.FC = () => {
  const { addRestaurant } = useRestaurants();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  
  const handleSubmit = (data: any) => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      try {
        addRestaurant(data);
        setAlert({
          type: 'success',
          message: 'Restaurant added successfully!'
        });
        
        // Redirect after short delay
        setTimeout(() => {
          navigate('/main-admin');
        }, 1500);
      } catch (error) {
        setAlert({
          type: 'error',
          message: 'Failed to add restaurant. Please try again.'
        });
      } finally {
        setIsLoading(false);
      }
    }, 800);
  };
  
  return (
    <div className="add-restaurant">
      <Sidebar />
      
      <main className="add-restaurant-main">
        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
            autoHide={alert.type === 'success'}
          />
        )}
        
        <div className="add-restaurant-header">
          <button 
            className="btn btn-secondary back-button"
            onClick={() => navigate('/main-admin')}
          >
            <ArrowLeft size={18} className="btn-icon" />
            Back to Dashboard
          </button>
          <h1 className="add-restaurant-title">Add New Restaurant</h1>
        </div>
        
        <div className="add-restaurant-content">
          <div className="card">
            <RestaurantForm
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddRestaurant;