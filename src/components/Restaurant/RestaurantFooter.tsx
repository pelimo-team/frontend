import React from 'react';

const RestaurantFooter: React.FC = () => {
  return (
    <footer className="restaurant-footer py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4 mb-md-0">
            <h4 className="footer-title">درباره ما</h4>
            <p className="footer-text">
              رستوران نمونه با بیش از 10 سال سابقه در ارائه غذاهای سنتی و مدرن
              ایرانی، همواره سعی در جلب رضایت مشتریان عزیز داشته است.
            </p>
          </div>
          <div className="col-md-4 mb-4 mb-md-0">
            <h4 className="footer-title">ساعات کاری</h4>
            <ul className="list-unstyled footer-text">
              <li className="mb-2">شنبه تا چهارشنبه: 11 صبح - 11 شب</li>
              <li>پنجشنبه و جمعه: 11 صبح - 12 شب</li>
            </ul>
          </div>
          <div className="col-md-4">
            <h4 className="footer-title">تماس با ما</h4>
            <ul className="list-unstyled footer-text">
              <li className="mb-2">آدرس: تهران، خیابان ولیعصر</li>
              <li className="mb-2">تلفن: 88888888-021</li>
              <li>ایمیل: info@example.com</li>
            </ul>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12 text-center">
            <p className="copyright">© تمامی حقوق محفوظ است 1402</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default RestaurantFooter; 