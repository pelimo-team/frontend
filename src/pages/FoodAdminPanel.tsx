import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Form, Button, Table, Badge, Spinner } from "react-bootstrap";
import "../styles/FoodAdminPanel.css";

type FoodItem = {
  name: string;
  image: string;
  price: number;
  isHot: boolean;
  category: string;
  stock: number;
  rating: number;
  freeDelivery: boolean;
  popularity: number;
};

const FoodAdminPanel: React.FC = () => {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<FoodItem>({
    name: "",
    image: "",
    price: 0,
    isHot: true,
    category: "غذای اصلی",
    stock: 0,
    rating: 0,
    freeDelivery: false,
    popularity: 0,
  });

  useEffect(() => {
    const dummyData: FoodItem[] = [
      {
        name: "کباب کوبیده",
        image: "https://via.placeholder.com/50",
        price: 120000,
        isHot: true,
        category: "غذای اصلی",
        stock: 10,
        rating: 4.5,
        freeDelivery: true,
        popularity: 90,
      },
    ];
    setFoods(dummyData);
    setLoading(false);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked, files } = e.target as HTMLInputElement;

    if (name === "image" && files && files.length > 0) {
      const fileURL = URL.createObjectURL(files[0]);
      setFormData((prev) => ({ ...prev, image: fileURL }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox"
          ? checked
          : ["price", "stock", "rating", "popularity"].includes(name)
          ? Math.max(0, parseFloat(value))
          : value,
      }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (editIndex !== null) {
      const updated = [...foods];
      updated[editIndex] = formData;
      setFoods(updated);
      setEditIndex(null);
    } else {
      setFoods((prev) => [...prev, formData]);
    }

    setFormData({
      name: "",
      image: "",
      price: 0,
      isHot: true,
      category: "غذای اصلی",
      stock: 0,
      rating: 0,
      freeDelivery: false,
      popularity: 0,
    });
  };

  const handleDelete = (index: number) => {
    setFoods((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEdit = (index: number) => {
    setFormData(foods[index]);
    setEditIndex(index);
  };

  return (
    <div className="food-admin-panel">
      <h2>مدیریت منوی غذا</h2>

      <Form onSubmit={handleSubmit} className="food-form">
        <Form.Group>
          <Form.Label>نام غذا</Form.Label>
          <Form.Control name="name" value={formData.name} onChange={handleChange} required />
        </Form.Group>

        <Form.Group>
          <Form.Label>آپلود عکس</Form.Label>
          <Form.Control type="file" name="image" onChange={handleChange} accept="image/*" />
          {formData.image && <img src={formData.image} alt="preview" className="food-preview" />}
        </Form.Group>

        <Form.Group>
          <Form.Label>قیمت (تومان)</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min={0}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>دسته‌بندی</Form.Label>
          <Form.Select name="category" value={formData.category} onChange={handleChange}>
            <option>پیش غذا</option>
            <option>غذای اصلی</option>
            <option>دسر</option>
            <option>نوشیدنی</option>
          </Form.Select>
        </Form.Group>

        <Form.Group>
          <Form.Label>موجودی</Form.Label>
          <Form.Control
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            min={0}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>امتیاز</Form.Label>
          <Form.Control
            type="number"
            name="rating"
            step="0.1"
            value={formData.rating}
            onChange={handleChange}
            min={0}
            max={5}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>محبوبیت</Form.Label>
          <Form.Control
            type="number"
            name="popularity"
            value={formData.popularity}
            onChange={handleChange}
            min={0}
            max={100}
          />
        </Form.Group>

        <Form.Check
          type="switch"
          id="isHot"
          label="سرو گرم"
          name="isHot"
          checked={formData.isHot}
          onChange={handleChange}
        />

        <Form.Check
          type="switch"
          id="freeDelivery"
          label="ارسال رایگان"
          name="freeDelivery"
          checked={formData.freeDelivery}
          onChange={handleChange}
        />

        <Button type="submit" className="mt-3">
          {editIndex !== null ? "ذخیره تغییرات" : "افزودن غذا"}
        </Button>
      </Form>

      <hr />

      <h4>لیست غذاها</h4>
      {loading ? (
        <div className="text-center my-4">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table striped hover responsive>
          <thead>
            <tr>
              <th>عکس</th>
              <th>نام</th>
              <th>قیمت</th>
              <th>دسته</th>
              <th>سرو</th>
              <th>موجودی</th>
              <th>امتیاز</th>
              <th>ارسال رایگان</th>
              <th>محبوبیت</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food, index) => (
              <tr key={index}>
                <td>{food.image && <img src={food.image} width="50" alt="غذا" />}</td>
                <td>{food.name}</td>
                <td>{food.price}</td>
                <td>{food.category}</td>
                <td>{food.isHot ? <Badge bg="danger">گرم</Badge> : <Badge bg="secondary">سرد</Badge>}</td>
                <td>{food.stock}</td>
                <td>{food.rating}</td>
                <td>{food.freeDelivery ? "✅" : "❌"}</td>
                <td>{food.popularity}</td>
                <td>
                  <Button size="sm" variant="warning" onClick={() => handleEdit(index)} className="me-1">
                    ویرایش
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(index)}>
                    حذف
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
