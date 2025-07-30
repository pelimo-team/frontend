import React, { useState } from 'react';
import { MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import StarRating from './StarRating';

interface RestaurantInfoProps {
  name: string;
  location: string;
  description: string; // raw string with \r\n from backend
  rating: number;
}

const RestaurantInfo: React.FC<RestaurantInfoProps> = ({
  name,
  location,
  description,
  rating,
}) => {
  const [showHours, setShowHours] = useState(false);

  const lines = description.split(/\r?\n/);
  const hoursStartIndex = lines.findIndex((line) =>
    /store opening hours:/i.test(line)
  );
  const addressStartIndex = lines.findIndex((line) =>
    /^address:$/i.test(line.trim())
  );

  const hoursLines = lines.slice(hoursStartIndex + 1, addressStartIndex);
  const addressLines = lines.slice(addressStartIndex + 1);

  return (
    <section className="restaurant-info py-4 px-3 animated-section">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-md-8">
            <h1 className="restaurant-name mb-3">{name}</h1>

            <div className="d-flex align-items-center mb-2">
              <MapPin size={18} className="text-primary me-2" />
              <span className="location-text">{location}</span>
            </div>

            <div className="restaurant-description text-muted mt-3">

              {/* Store Opening Hours Dropdown */}
              <div className="mb-3">
                <button
                  className="btn btn-sm  d-flex align-items-center"
                  onClick={() => setShowHours((prev) => !prev)}
                >
                  <strong className="me-2">Store Opening Hours</strong>
                  {showHours ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                {showHours && (
                  <ul className="mt-2 ms-3">
                    {hoursLines.map((line, index) => (
                      <li key={index}>{line}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Address Section */}
              <div>
                <strong>Address:</strong>
                {addressLines.map((line, index) => (
                  <p key={index} className="mb-1">{line}</p>
                ))}
              </div>

            </div>
          </div>

          <div className="col-md-4 text-md-end mt-3 mt-md-0">
            <div className="rating-box d-inline-flex align-items-center">
              <StarRating rating={rating} />
              <span className="rating-value ms-2">{rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RestaurantInfo;
