import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Form, Button, Spinner, Alert } from "react-bootstrap";
import axios from "axios";

interface Option {
  id: number;
  name: string;
}

interface RestaurantInfo {
  name: string;
  description: string;
  cityId: number | "";
  coverImage: File | null;
  logo: File | null;
  restaurantTypeId: number | "";
  deliveryCost: number | null;
  isNightwalker: boolean;
  isPublished: boolean;
}

const token = localStorage.getItem("token");
const csrfToken =
  document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrftoken="))
    ?.split("=")[1] || "";

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
  withCredentials: true,
  headers: {
    Authorization: token ? `Token ${token}` : "",
    "X-CSRFToken": csrfToken,
  },
});

const RestaurantForm: React.FC = () => {
  const [restaurantInfo, setRestaurantInfo] = useState<RestaurantInfo>({
    name: "",
    description: "",
    cityId: "",
    coverImage: null,
    logo: null,
    restaurantTypeId: "",
    deliveryCost: null,
    isNightwalker: false,
    isPublished: false,
  });

  const [restaurantTypes, setRestaurantTypes] = useState<Option[]>([]);
  const [cities, setCities] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    api
      .get("/api/accounts/restaurant-form-data/")
      .then((res) => {
        setCities(res.data.cities);
        setRestaurantTypes(res.data.restaurant_types);
      })
      .catch((err) => {
        console.error("Error loading form data:", err);
      });
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setRestaurantInfo((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file" && files) {
      setRestaurantInfo((prev) => ({ ...prev, [name]: files[0] }));
    } else if (type === "select-one") {
      setRestaurantInfo((prev) => ({
        ...prev,
        [name]: value === "" ? "" : parseInt(value),
      }));
    } else {
      setRestaurantInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    const formData = new FormData();
    formData.append("restaurant[name]", restaurantInfo.name);
    formData.append("restaurant[description]", restaurantInfo.description);
    formData.append("restaurant[city_id]", String(restaurantInfo.cityId));
    formData.append(
      "restaurant[restaurant_type_id]",
      String(restaurantInfo.restaurantTypeId)
    );
    formData.append(
      "restaurant[delivery_cost]",
      String(restaurantInfo.deliveryCost ?? 0)
    );
    formData.append(
      "restaurant[is_nightwalker]",
      restaurantInfo.isNightwalker.toString()
    );
    formData.append(
      "restaurant[is_published]",
      restaurantInfo.isPublished.toString()
    );

    if (restaurantInfo.coverImage) {
      formData.append("restaurant[cover_image]", restaurantInfo.coverImage);
    }
    if (restaurantInfo.logo) {
      formData.append("restaurant[logo]", restaurantInfo.logo);
    }

    try {
      await api.post("/accounts/create-restaurant/", formData, {
        headers: { "Content-Type": "multipart/form-data", },
      });
      setSuccessMessage("Restaurant created successfully.");
      setRestaurantInfo({
        name: "",
        description: "",
        cityId: "",
        coverImage: null,
        logo: null,
        restaurantTypeId: "",
        deliveryCost: null,
        isNightwalker: false,
        isPublished: false,
      });
    } catch (err: any) {
      console.error(err);
      if (err.response?.status === 403) {
        setErrorMessage(
          "Access denied: You do not have permission to create a restaurant."
        );
      } else {
        setErrorMessage("Failed to create restaurant.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="restaurant-information">
      <h3>Create Your Restaurant</h3>

      <Form onSubmit={handleSubmit} className="restaurant-info-form">
        <Form.Group className="mb-3">
          <Form.Label>Restaurant Name</Form.Label>
          <Form.Control
            name="name"
            value={restaurantInfo.name}
            onChange={handleChange}
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
            onChange={handleChange}
            placeholder="Enter restaurant description"
            rows={3}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Select
            name="cityId"
            value={restaurantInfo.cityId}
            onChange={handleChange}
            required
          >
            <option value="">Select city</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Cover Image</Form.Label>
          <Form.Control
            type="file"
            name="coverImage"
            onChange={handleChange}
            accept="image/*"
          />
          {restaurantInfo.coverImage && (
            <img
              src={URL.createObjectURL(restaurantInfo.coverImage)}
              alt="Cover preview"
              className="image-preview cover-preview"
              style={{ maxWidth: "200px", marginTop: "10px" }}
            />
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Logo</Form.Label>
          <Form.Control
            type="file"
            name="logo"
            onChange={handleChange}
            accept="image/*"
          />
          {restaurantInfo.logo && (
            <img
              src={URL.createObjectURL(restaurantInfo.logo)}
              alt="Logo preview"
              className="image-preview logo-preview"
              style={{ maxWidth: "200px", marginTop: "10px" }}
            />
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Restaurant Type</Form.Label>
          <Form.Select
            name="restaurantTypeId"
            value={restaurantInfo.restaurantTypeId}
            onChange={handleChange}
            required
          >
            <option value="">Select type</option>
            {restaurantTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
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
            onChange={handleChange}
            placeholder="Enter delivery cost"
            min="0"
          />
        </Form.Group>

        <Form.Check
          type="checkbox"
          label="Night Walker"
          name="isNightwalker"
          checked={restaurantInfo.isNightwalker}
          onChange={handleChange}
          className="mb-2"
        />

        <Form.Check
          type="checkbox"
          label="Published"
          name="isPublished"
          checked={restaurantInfo.isPublished}
          onChange={handleChange}
          className="mb-3"
        />

        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}

        <Button type="submit" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : "Save Restaurant"}
        </Button>
      </Form>
    </div>
  );
};

export default RestaurantForm;
