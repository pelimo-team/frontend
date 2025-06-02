import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import Sidebar from './Sidebar';
import RestaurantCard from './RestaurantCard';
import DeleteConfirmModal from './DeleteConfirmModal';
import Alert from './Alert';
import { useRestaurants } from '../MainAdminContext/RestaurantContext';
import '../../styles/MainAdmin.css'

const Dashboard: React.FC = () => {
  const { restaurants, deleteRestaurant } = useRestaurants();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  
  // Filter restaurants based on search term
  const filteredRestaurants = restaurants.filter(restaurant => 
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.restaurantType.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle edit restaurant
  const handleEdit = (id: string) => {
    navigate(`/edit-restaurant/${id}`);
  };
  
  // Handle delete restaurant
  const handleDelete = (id: string) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };
  
  // Confirm delete restaurant
  const confirmDelete = () => {
    if (deleteId) {
      deleteRestaurant(deleteId);
      setShowDeleteModal(false);
      setAlert({
        type: 'success',
        message: 'Restaurant deleted successfully'
      });
      setDeleteId(null);
    }
  };
  
  // Cancel delete restaurant
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };
  
  return (
    <div className="dashboard">
      <Sidebar />
      
      <main className="dashboard-main">
        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}
        
        <div className="dashboard-header">
          <h1 className="dashboard-title">Restaurant Dashboard</h1>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/add-restaurant')}
          >
            <Plus size={18} className="btn-icon" />
            Add Restaurant
          </button>
        </div>
        
        <div className="dashboard-search">
          <div className="search-container">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search restaurants by name, city or type..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="restaurant-grid">
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map(restaurant => (
              <div className="restaurant-grid-item\" key={restaurant.id}>
                <RestaurantCard
                  restaurant={restaurant}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </div>
            ))
          ) : (
            <div className="restaurant-empty">
              {searchTerm ? (
                <p>No restaurants found matching "{searchTerm}"</p>
              ) : (
                <p>No restaurants added yet. Add your first restaurant!</p>
              )}
            </div>
          )}
        </div>
      </main>
      
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        title="Delete Restaurant"
        message="Are you sure you want to delete this restaurant? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default Dashboard;