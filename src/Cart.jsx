import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Image } from 'react-bootstrap';
import './CartPage.css';

const CartPage = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [showAllItems, setShowAllItems] = useState({});

  useEffect(() => {
   
      setRestaurant({
        name: 'رستوران پلومو',
        location: 'تهران، ونک',
        rating: 4,
        image: '/restaurant.jpg',
        logo: '/Logo.png',
        username: 'username123',
        avatar: null,
      });

      setMenuItems([
        {
          category: 'دسته بندی ۱',
          items: [
            { id: 1, name: 'سالاد سزار', price: '50000', image: '/food_image.jpg' },
            { id: 2, name: 'سوپ ورمیشل', price: '30000', image: '/food_image.jpg' },
            { id: 3, name: 'پیتزا مارگاریتا', price: '70000', image: '/food_image.jpg' },
          ],
        },
        {
          category: 'دسته بندی ۲',
          items: [
            { id: 4, name: 'استیک گوشت', price: '150000', image: '/food_image.jpg' },
            { id: 5, name: 'پاستا آلفردو', price: '120000', image: '/food_image.jpg' },
            { id: 6, name: 'چیکن کوردن بلو', price: '110000', image: '/food_image.jpg' },
          ],
        },
        {
          category: 'دسته بندی ۳',
          items: [
            { id: 7, name: 'برگر کلاسیک', price: '90000', image: '/food_image.jpg' },
            { id: 8, name: 'هات‌داگ ویژه', price: '60000', image: '/food_image.jpg' },
            { id: 9, name: 'ساندویچ مرغ', price: '65000', image: '/food_image.jpg' },
          ],
        },
      ]);
   
  }, []);

  const toggleShowAll = (index) => {
    setShowAllItems((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <Container className="mt-5 text-end">
      <h5 className="mb-4 fw-bold">
        آدرس: تهران، صادقیه، فلکه دوم، کوچه سلام، پلاک 10 واحد 11
      </h5>

      {restaurant && menuItems.length > 0 && (
        <>
          {menuItems.map((category, index) => (
            <Card className="mb-5 p-4 border border-dark" key={index}>
              <Row>
                <Col xs={12} className="d-flex justify-content-between align-items-center mb-3">
                  <div className="restaurant-header">
                    <div className="logo-circle">
                      <Image src={restaurant.logo} fluid />
                    </div>
                    <div className="text-end">
                      <h4 className="fw-bold mb-1">{restaurant.name}</h4>
                      <span className="text-muted">جمعه 29 فروردین . 20:30</span>
                    </div>
                  </div>
                </Col>

                <div
                  className="menu-item-wrapper"
                  style={{
                    maxHeight: showAllItems[index] ? '1000px' : '320px',
                  }}
                >
                  {(showAllItems[index] ? category.items : category.items.slice(0, 2)).map((item) => (
                    <Row className="align-items-center border-top pt-3 mt-3" key={item.id}>
                      <Col md={2}>
                        <Image src={item.image} fluid style={{ width: '90px' }} />
                      </Col>
                      <Col md={6}>
                        <h5>{item.name}</h5>
                      </Col>
                      <Col md={4} className="text-start">
                        <h5>{parseInt(item.price).toLocaleString()} تومان</h5>
                      </Col>
                    </Row>
                  ))}
                </div>

                {category.items.length > 2 && (
                  <div
                    className="text-center my-3 cursor-pointer more-toggle"
                    onClick={() => toggleShowAll(index)}
                  >
                    <span>
                      {showAllItems[index] ? 'بستن' : 'موارد بیشتر'}
                      <span className={`arrow-icon ${showAllItems[index] ? 'rotate' : ''}`}>▼</span>
                    </span>
                  </div>
                )}

                <div className="d-flex justify-content-center gap-3 align-items-center mt-4">
                  <button className="custom-delete-btn">حذف سبد</button>
                  <button className="custom-continue-btn">ادامه خرید</button>
                </div>
              </Row>
            </Card>
          ))}
        </>
      )}
    </Container>
  );
};

export default CartPage;
