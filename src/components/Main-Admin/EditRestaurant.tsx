import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Sidebar from './Sidebar';
import RestaurantForm from './RestaurantForm';
import Alert from './Alert';
import { useRestaurants } from '../MainAdminContext/RestaurantContext';
import '../../styles/MainAdmin.css'

const EditRestaurant: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getRestaurant, updateRestaurant } = useRestaurants();
  const navigate = useNavigate();
  
  const [restaurant, setRestaurant] = useState(id ? getRestaurant(id) : undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  
  // Redirect if restaurant not found
  useEffect(() => {
    if (id && !restaurant) {
      setAlert({
        type: 'error',
        message: 'Restaurant not found'
      });
      
      setTimeout(() => {
        navigate('/main-admin');
      }, 2000);
    }
  }, [id, restaurant, navigate]);
  
  const handleSubmit = (data: any) => {
    if (!id) return;
    
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      try {
        updateRestaurant(id, data);
        setAlert({
          type: 'success',
          message: 'Restaurant updated successfully!'
        });
        
        // Update local state
        setRestaurant(getRestaurant(id));
        
        // Redirect after short delay
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } catch (error) {
        setAlert({
          type: 'error',
          message: 'Failed to update restaurant. Please try again.'
        });
      } finally {
        setIsLoading(false);
      }
    }, 800);
  };
  
  if (!restaurant && id) {
    return (
      <div className="add-restaurant">
        <Sidebar />
        <main className="add-restaurant-main">
          {alert && (
            <Alert
              type={alert.type}
              message={alert.message}
              onClose={() => setAlert(null)}
            />
          )}
          <div className="add-restaurant-content">
            <div className="card">
              <p>Loading restaurant information...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }
  
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
          <h1 className="add-restaurant-title">Edit Restaurant</h1>
        </div>
        
        <div className="add-restaurant-content">
          <div className="card">
            {restaurant ? (
              <RestaurantForm
                initialData={restaurant}
                onSubmit={handleSubmit}
                isLoading={isLoading}
              />
            ) : (
              <p>Restaurant not found</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditRestaurant;