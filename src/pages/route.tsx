import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Login from "./Login";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";
import EnterCode from "./entercode"; // فایل صفحه واردکردن کد
import SetNewPassword from "./SetNewPassword"; // فایل صفحه تعیین رمز جدید
import EnterCodeSignup from "./EnterCodeSignup";
import Userprofile from "./Userprofile";
import Search from "./Search";
import AdvancedSearch from "./AdvancedSearch";
import NightWalker from "./NightWalker";
import Restaurant from "./Restaurant";
import FoodPage from "./FoodPage";
import AdvanceTasadofi from "./AdvanceTasadofi";
import MenuBuilder from "./Model";
import Cart from "./Cart";
import AddCommentPage from "./AddCommentPage";
import FoodAdminPanel from "./FoodAdminPanel";

export const ProjectRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* صفحه مدیریت غذا */}
        <Route path="/admin" element={<FoodAdminPanel />} />

        {/* صفحه اصلی */}
        <Route path="/" element={<HomePage />} />

        {/* صفحه لاگین */}
        <Route path="/login" element={<Login />} />

        {/* صفحه ثبت‌نام */}
        <Route path="/signup" element={<Signup />} />

        {/* فراموشی رمز (دریافت ایمیل) */}
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* وارد کردن کد تأیید */}
        <Route path="/enter-code" element={<EnterCode />} />

        {/* تعیین رمز عبور جدید */}
        <Route path="/set-new-password" element={<SetNewPassword />} />
        <Route path="/enter-code-signup" element={<EnterCodeSignup />} />

        {/* صفحه پروفایل کاربر */}
        <Route path="/userprofile" element={<Userprofile />} />

        {/* مشاهده و افزودن کامنت */}
        <Route path="/add-comment" element={<AddCommentPage />} />

        {/* صفحه جستجوی غذا */}
        <Route path="/search" element={<Search />} />

        {/* سرچ پیشرفته */}
        <Route path="/advanced-search" element={<AdvancedSearch />} />

        {/* صفحه شبگرد */}
        <Route path="/night-walker" element={<NightWalker />} />

        {/* صفحه رستوران ها */}
        <Route path="/restaurant/:id" element={<Restaurant />} />

        {/* صفحه غذاها */}
        <Route path="/foodpage/:id" element={<FoodPage />} />

        {/* صفحه جستجوی تصادفی */}
        <Route path="/advance-tasadofi" element={<AdvanceTasadofi />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/model" element={<MenuBuilder />} />
      </Routes>
    </Router>
  );
};
