import React, { useState, useEffect, useRef } from 'react';
import { Restaurant, RestaurantType } from './types';
import '../../styles/MainAdmin.css'

interface RestaurantFormProps {
  initialData?: Restaurant;
  onSubmit: (data: Omit<Restaurant, 'id'>) => void;
  isLoading?: boolean;
}

const RestaurantForm: React.FC<RestaurantFormProps> = ({
  initialData,
  onSubmit,
  isLoading = false
}) => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [logo, setLogo] = useState('');
  const [restaurantType, setRestaurantType] = useState<RestaurantType>('restaurant');
  const [deliveryCost, setDeliveryCost] = useState('');
  const [isNightWalker, setIsNightWalker] = useState(false);
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const coverImageInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  // Initialize form with initial data if provided
  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setCity(initialData.city);
      setCoverImage(initialData.coverImage);
      setLogo(initialData.logo);
      setRestaurantType(initialData.restaurantType);
      setDeliveryCost(initialData.deliveryCost.toString());
      setIsNightWalker(initialData.isNightWalker);
    }
  }, [initialData]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, type: 'cover' | 'logo') => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          if (type === 'cover') {
            setCoverImage(reader.result);
          } else {
            setLogo(reader.result);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Validate a single field
  const validateField = (field: string, value: string | boolean): string => {
    switch (field) {
      case 'name':
        return !value ? 'Restaurant name is required' : '';
      case 'city':
        return !value ? 'City is required' : '';
      case 'coverImage':
        return !value ? 'Cover image is required' : '';
      case 'logo':
        return !value ? 'Logo is required' : '';
      case 'deliveryCost':
        return !value
          ? 'Delivery cost is required'
          : isNaN(Number(value)) || Number(value) < 0
          ? 'Delivery cost must be a positive number'
          : '';
      default:
        return '';
    }
  };

  // Handle field blur for validation
  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    
    let value;
    switch (field) {
      case 'name':
        value = name;
        break;
      case 'city':
        value = city;
        break;
      case 'coverImage':
        value = coverImage;
        break;
      case 'logo':
        value = logo;
        break;
      case 'deliveryCost':
        value = deliveryCost;
        break;
      default:
        value = '';
    }
    
    const error = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  // Validate all fields
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {
      name: validateField('name', name),
      city: validateField('city', city),
      coverImage: validateField('coverImage', coverImage),
      logo: validateField('logo', logo),
      deliveryCost: validateField('deliveryCost', deliveryCost)
    };
    
    setErrors(newErrors);
    setTouched({
      name: true,
      city: true,
      coverImage: true,
      logo: true,
      deliveryCost: true
    });
    
    return !Object.values(newErrors).some(error => error);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        name,
        city,
        coverImage,
        logo,
        restaurantType,
        deliveryCost: parseFloat(deliveryCost),
        isNightWalker
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="restaurant-form">
      <div className="form-group">
        <label htmlFor="name" className="form-label">Restaurant Name</label>
        <input
          type="text"
          id="name"
          className={`form-input ${touched.name && errors.name ? 'form-input-error' : ''}`}
          value={name}
          onChange={e => setName(e.target.value)}
          onBlur={() => handleBlur('name')}
          disabled={isLoading}
        />
        {touched.name && errors.name && <p className="form-error">{errors.name}</p>}
      </div>
      
      <div className="form-group">
        <label htmlFor="city" className="form-label">City</label>
        <input
          type="text"
          id="city"
          className={`form-input ${touched.city && errors.city ? 'form-input-error' : ''}`}
          value={city}
          onChange={e => setCity(e.target.value)}
          onBlur={() => handleBlur('city')}
          disabled={isLoading}
        />
        {touched.city && errors.city && <p className="form-error">{errors.city}</p>}
      </div>
      
      <div className="form-row">
        <div className="form-group form-group-half">
          <label htmlFor="coverImage" className="form-label">Cover Image</label>
          <input
            type="file"
            id="coverImage"
            ref={coverImageInputRef}
            className={`form-input file-input ${touched.coverImage && errors.coverImage ? 'form-input-error' : ''}`}
            onChange={(e) => handleFileChange(e, 'cover')}
            accept="image/*"
            disabled={isLoading}
          />
          {touched.coverImage && errors.coverImage && <p className="form-error">{errors.coverImage}</p>}
        </div>
        
        <div className="form-group form-group-half">
          <label htmlFor="logo" className="form-label">Logo</label>
          <input
            type="file"
            id="logo"
            ref={logoInputRef}
            className={`form-input file-input ${touched.logo && errors.logo ? 'form-input-error' : ''}`}
            onChange={(e) => handleFileChange(e, 'logo')}
            accept="image/*"
            disabled={isLoading}
          />
          {touched.logo && errors.logo && <p className="form-error">{errors.logo}</p>}
        </div>
      </div>
      
      {/* Image previews */}
      {(coverImage || logo) && (
        <div className="form-preview">
          <div className="form-preview-row">
            {coverImage && (
              <div className="form-preview-item">
                <label className="form-label">Cover Image Preview</label>
                <div className="form-preview-image">
                  <img src={coverImage} alt="Cover preview" />
                </div>
              </div>
            )}
            
            {logo && (
              <div className="form-preview-item">
                <label className="form-label">Logo Preview</label>
                <div className="form-preview-image form-preview-logo">
                  <img src={logo} alt="Logo preview" />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className="form-group">
        <label htmlFor="restaurantType" className="form-label">Restaurant Type</label>
        <select
          id="restaurantType"
          className="form-select"
          value={restaurantType}
          onChange={e => setRestaurantType(e.target.value as RestaurantType)}
          disabled={isLoading}
        >
          <option value="restaurant">Restaurant</option>
          <option value="fast food">Fast Food</option>
          <option value="coffee shop">Coffee Shop</option>
          <option value="juice and ice cream">Juice & Ice Cream</option>
          <option value="confectionary">Confectionary</option>
          <option value="fruit">Fruit</option>
        </select>
      </div>
      
      <div className="form-row">
        <div className="form-group form-group-half">
          <label htmlFor="deliveryCost" className="form-label">Delivery Cost</label>
          <div className="form-input-icon">
            <span className="form-input-prefix">$</span>
            <input
              type="text"
              id="deliveryCost"
              className={`form-input form-input-with-prefix ${touched.deliveryCost && errors.deliveryCost ? 'form-input-error' : ''}`}
              value={deliveryCost}
              onChange={e => setDeliveryCost(e.target.value)}
              onBlur={() => handleBlur('deliveryCost')}
              disabled={isLoading}
            />
          </div>
          {touched.deliveryCost && errors.deliveryCost && <p className="form-error">{errors.deliveryCost}</p>}
        </div>
        
        <div className="form-group form-group-half">
          <label className="form-label">Night Walker Restaurant</label>
          <div className="form-toggle">
            <label className="toggle-container">
              <input
                type="checkbox"
                className="toggle-input"
                checked={isNightWalker}
                onChange={e => setIsNightWalker(e.target.checked)}
                disabled={isLoading}
              />
              <span className="toggle-slider"></span>
            </label>
            <span className="toggle-label">{isNightWalker ? 'Yes' : 'No'}</span>
          </div>
        </div>
      </div>
      
      <div className="form-actions">
        <button 
          type="submit" 
          className="btn btn-primary" 
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : initialData ? 'Update Restaurant' : 'Add Restaurant'}
        </button>
      </div>
    </form>
  );
};

export default RestaurantForm;