import React, { ChangeEvent, FormEvent } from "react";
import { Form, Button } from "react-bootstrap";

interface RestaurantInfo {
  name: string;
  description: string;
  city: string;
  coverImage: File | string | null;
  logo: File | string | null;
  type: string;
  deliveryCost: number | null;
  isNightwalker: boolean;
  isPublished: boolean;
}

interface RestaurantInformationProps {
  restaurantInfo: RestaurantInfo;
  restaurantTypes: string[];
  onRestaurantInfoChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: (e: FormEvent) => void;
}

const RestaurantInformation: React.FC<RestaurantInformationProps> = ({
  restaurantInfo,
  restaurantTypes,
  onRestaurantInfoChange,
  onSubmit,
}) => {
  return (
    <div className="restaurant-information">
      <Form onSubmit={onSubmit} className="restaurant-info-form">
        <Form.Group className="mb-3">
          <Form.Label>Restaurant Name</Form.Label>
          <Form.Control
            name="name"
            value={restaurantInfo.name}
            onChange={onRestaurantInfoChange}
            placeholder="Enter restaurant name"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={restaurantInfo.description}
            onChange={onRestaurantInfoChange}
            placeholder="Enter restaurant description"
            rows={3}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control
            name="city"
            value={restaurantInfo.city}
            onChange={onRestaurantInfoChange}
            placeholder="Enter city"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Cover Image</Form.Label>
          <Form.Control
            type="file"
            name="coverImage"
            onChange={onRestaurantInfoChange}
            accept="image/*"
          />
          {restaurantInfo.coverImage instanceof File && (
            <img
              src={URL.createObjectURL(restaurantInfo.coverImage)}
              alt="Cover preview"
              className="image-preview cover-preview"
            />
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Logo</Form.Label>
          <Form.Control
            type="file"
            name="logo"
            onChange={onRestaurantInfoChange}
            accept="image/*"
          />
          {restaurantInfo.logo instanceof File && (
            <img
              src={URL.createObjectURL(restaurantInfo.logo)}
              alt="Logo preview"
              className="image-preview logo-preview"
            />
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Restaurant Type</Form.Label>
          <Form.Select
            name="type"
            value={restaurantInfo.type}
            onChange={onRestaurantInfoChange}
            required
          >
            <option value="">Select type</option>
            {restaurantTypes.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Delivery Cost</Form.Label>
          <Form.Control
            type="number"
            name="deliveryCost"
            value={restaurantInfo.deliveryCost ?? ""}
            onChange={onRestaurantInfoChange}
            placeholder="Enter delivery cost"
            min="0"
          />
        </Form.Group>

        <Form.Check
          type="checkbox"
          label="Night Walker"
          name="isNightwalker"
          checked={restaurantInfo.isNightwalker}
          onChange={onRestaurantInfoChange}
          className="mb-2"
        />

        <Form.Check
          type="checkbox"
          label="Published"
          name="isPublished"
          checked={restaurantInfo.isPublished}
          onChange={onRestaurantInfoChange}
          className="checkbox-info"
        />

        <Button className="submit-btn-info" type="submit">
          Save Restaurant Information
        </Button>
      </Form>
    </div>
  );
};

export default RestaurantInformation; 