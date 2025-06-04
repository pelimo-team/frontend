
import FoodDetail from "../components/FoodPage/FoodDetail";
import { foodItem } from "../components/FoodPage/data";
import "../styles/FoodPage.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { MenuItem } from "../components/AdvancedSearch/types";


function FoodPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state?.item as MenuItem;
    if (!item) {
    return <div>هیچ آیتمی برای نمایش یافت نشد.</div>;
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <button className="food-basket-btn" onClick={() => navigate("/cart")}>
            <img src="./cart-shopping-solid.svg" alt="" />
          </button>
          <img className="logo" src="./Logo.png" alt="" />
          <button
            className="food-back-btn"
            onClick={() => navigate(-1)}
          >
            <img src="./arrow-right-solid.svg" alt="" />
          </button>
        </div>
      </header>
      <main className="main-content">
        <FoodDetail food={foodItem} />
      </main>

 
    </div>
  );
}

export default FoodPage;

// import { useLocation } from "react-router-dom";
// import { MenuItem } from "../components/AdvancedSearch/types";

// const FoodPage = () => {
//   const location = useLocation();
//   const item = location.state?.item as MenuItem;

//   if (!item) {
//     return <div>هیچ آیتمی برای نمایش یافت نشد.</div>;
//   }

//   return (
//     <div className="food-page">
//       <img src={item.image ||undefined } alt={item.name} />
//       <h1>{item.name}</h1>
//       <p>{item.description}</p>
//       <p>قیمت: {item.price} تومان</p>
//       <p>دسته‌بندی: {item.category_name}</p>
//       <p>rate: {item.rate}</p>
//       <p>sale: {item.sale_price}</p>


//       {/* و سایر اطلاعات مورد نیاز */}
//     </div>
//   );
// };

// export default FoodPage;
