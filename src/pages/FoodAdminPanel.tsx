import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Form, Button, Table, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import "../styles/FoodAdminPanel.css";

type FoodItem = {
  id?: number;
  name: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  stock: number;
  bestSeller: boolean;
};

const BASE_URL = "http://localhost:8000/api/manager/menu-items/";

const getAuthHeader = () => {
  const token = localStorage.getItem("authToken");
  console.log("TOKEN for request:", token);  // لاگ مقدار توکن
  return token ? { Authorization: `Token ${token}` } : {};
};

const FoodAdminPanel: React.FC = () => {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<number | null>(null);
  const [formData, setFormData] = useState<FoodItem>({
    name: "",
    image: "",
    originalPrice: 0,
    discountedPrice: 0,
    stock: 0,
    bestSeller: false,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
      .get(BASE_URL, { headers: getAuthHeader() })
      .then((res) => setFoods(res.data))
      .catch((err) => {
        console.error("axios error:", err);
        if (err.response?.status === 401) {
          setError("invalid token. please enter again");
        } else {
          setError("error in fetching menu items");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file" && files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]:
          type === "checkbox"
            ? checked
            : ["originalPrice", "discountedPrice", "stock"].includes(name)
            ? parseFloat(value)
            : value,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (editId !== null) {
        const res = await axios.put(`${BASE_URL}${editId}/`, formData, {
          headers: getAuthHeader(),
        });
        setFoods((prev) =>
          prev.map((food) => (food.id === editId ? res.data : food))
        );
        setEditId(null);
      } else {
        const res = await axios.post(BASE_URL, formData, {
          headers: getAuthHeader(),
        });
        setFoods((prev) => [...prev, res.data]);
      }

      setFormData({
        name: "",
        image: "",
        originalPrice: 0,
        discountedPrice: 0,
        stock: 0,
        bestSeller: false,
      });
    } catch (err) {
      setError("error in saving food information");
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    setError(null);
    try {
      await axios.delete(`${BASE_URL}${id}/`, { headers: getAuthHeader() });
      setFoods((prev) => prev.filter((food) => food.id !== id));
    } catch (err) {
      setError("error in deleting food");
      console.error(err);
    }
  };

  const handleEdit = (food: FoodItem) => {
    setFormData({
      id: food.id,
      name: food.name,
      image: food.image,
      originalPrice: food.originalPrice,
      discountedPrice: food.discountedPrice,
      stock: food.stock,
      bestSeller: food.bestSeller,
    });
    setEditId(food.id ?? null);
  };

  return (
    <div className="food-admin-panel" style={{ maxWidth: 800, margin: "auto" }}>
      <h2 className="mb-3">menu management</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit} className="food-form">
        <Form.Group className="mb-3">
          <Form.Label>name</Form.Label>
          <Form.Control
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>food image</Form.Label>
          <Form.Control
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
          />
          {formData.image && (
            <img
              src={formData.image}
              alt="preview"
              className="food-preview"
              style={{ width: "100px", marginTop: "10px" }}
            />
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>original cost(toman)</Form.Label>
          <Form.Control
            type="number"
            name="originalPrice"
            value={formData.originalPrice}
            onChange={handleChange}
            min={0}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>sale price(toman)</Form.Label>
          <Form.Control
            type="number"
            name="discountedPrice"
            value={formData.discountedPrice}
            onChange={handleChange}
            min={0}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>موجودی</Form.Label>
          <Form.Control
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            min={0}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Best Seller"
            name="bestSeller"
            checked={formData.bestSeller}
            onChange={handleChange}
          />
        </Form.Group>

        <Button type="submit" className="mt-3">
          {editId !== null ? "save changes" : "add food"}
        </Button>
      </Form>

      <hr />

      <h4>food list</h4>
      {loading ? (
        <div className="text-center my-4">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table striped hover responsive>
          <thead>
            <tr>
              <th>image</th>
              <th>name</th>
              <th>original price</th>
              <th>sale price</th>
              <th>amount</th>
              <th>best seller</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food) => (
              <tr key={food.id}>
                <td>
                  {food.image && <img src={food.image} width={50} alt="غذا" />}
                </td>
                <td>{food.name}</td>
                <td>{food.originalPrice.toLocaleString()}</td>
                <td>{food.discountedPrice.toLocaleString()}</td>
                <td>{food.stock}</td>
                <td>{food.bestSeller ? "✅" : "❌"}</td>
                <td>
                  <Button
                    size="sm"
                    variant="warning"
                    onClick={() => handleEdit(food)}
                    className="me-1"
                  >
                    edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => food.id && handleDelete(food.id)}
                  >
                    delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default FoodAdminPanel;
