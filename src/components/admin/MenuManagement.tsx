import React, { ChangeEvent, FormEvent } from "react";
import { Form, Button, Table, Alert } from "react-bootstrap";

interface MenuItem {
  id?: number;
  name: string;
  price: number | null;
  image?: File | string | null;
  rate: number | null;
  availability: boolean;
  bestseller: boolean;
  onsale: boolean;
  tab: string;
  quantity: number | null;
}

interface MenuManagementProps {
  menuItems: MenuItem[];
  formData: MenuItem;
  editId: number | null;
  error: string | null;
  disabled: boolean;
  onFormDataChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent) => void;
  onEdit: (item: MenuItem) => void;
  onDelete: (id: number) => void;
}

const MenuManagement: React.FC<MenuManagementProps> = ({
  menuItems,
  formData,
  editId,
  error,
  disabled,
  onFormDataChange,
  onSubmit,
  onEdit,
  onDelete,
}) => {
  const handleFormDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    onFormDataChange(e);
  };

  const handleSubmit = (e: FormEvent) => {
    if (disabled) return;
    onSubmit(e);
  };

  const handleEdit = (item: MenuItem) => {
    if (disabled) return;
    onEdit(item);
  };

  const handleDelete = (id: number) => {
    if (disabled) return;
    onDelete(id);
  };

  return (
    <div className="menu-management">
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit} className="food-form">
        <Form.Group className="mb-3">
          <Form.Label>Food Name</Form.Label>
          <Form.Control
            name="name"
            value={formData.name}
            onChange={handleFormDataChange}
            placeholder="Enter food name"
            required
            disabled={disabled}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            min="0"
            value={formData.price ?? ""}
            onChange={handleFormDataChange}
            placeholder="Enter price"
            disabled={disabled}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control
            type="file"
            name="image"
            onChange={handleFormDataChange}
            accept="image/*"
            disabled={disabled}
          />
          {formData.image &&
            (typeof formData.image === "string" ? (
              <img
                src={formData.image}
                alt="preview"
                className="food-preview"
              />
            ) : (
              <img
                src={URL.createObjectURL(formData.image)}
                alt="preview"
                className="food-preview"
              />
            ))}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Rating</Form.Label>
          <Form.Control
            type="number"
            name="rate"
            min="0"
            max={5}
            step="0.1"
            value={formData.rate ?? ""}
            onChange={handleFormDataChange}
            placeholder="Enter rating (0-5)"
            disabled={disabled}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            name="quantity"
            min="0"
            value={formData.quantity ?? ""}
            onChange={handleFormDataChange}
            placeholder="Enter quantity"
            disabled={disabled}
          />
        </Form.Group>
        <Form.Check
          className="mb-2"
          type="checkbox"
          label="Available"
          name="availability"
          checked={formData.availability}
          onChange={handleFormDataChange}
          disabled={disabled}
        />
        <Form.Check
          className="mb-2"
          type="checkbox"
          label="Bestseller"
          name="bestseller"
          checked={formData.bestseller}
          onChange={handleFormDataChange}
          disabled={disabled}
        />
        <Form.Check
          className="mb-2"
          type="checkbox"
          label="On Sale"
          name="onsale"
          checked={formData.onsale}
          onChange={handleFormDataChange}
          disabled={disabled}
        />
        <Button type="submit" disabled={disabled}>
          {editId !== null ? "Save Changes" : "Add Food"}
        </Button>
      </Form>

      <hr />
      <Table striped hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Rating</th>
            <th>Available</th>
            <th>Bestseller</th>
            <th>On Sale</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.rate}</td>
              <td>{item.availability ? "✅" : "❌"}</td>
              <td>{item.bestseller ? "✅" : "❌"}</td>
              <td>{item.onsale ? "✅" : "❌"}</td>
              <td>
                <Button
                  size="sm"
                  variant="warning"
                  onClick={() => handleEdit(item)}
                  disabled={disabled}
                >
                  Edit
                </Button>{" "}
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => item.id && handleDelete(item.id)}
                  disabled={disabled}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MenuManagement; 