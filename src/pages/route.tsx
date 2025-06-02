import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../components/MainAdminContext/MainAuthContexts";
import MainLogin from "../components/Main-Admin/MainLogin";
import Dashboard from "../components/Main-Admin/DashBoard";
import AddRestaurant from "../components/Main-Admin/AddRestaurant";
import EditRestaurant from "../components/Main-Admin/EditRestaurant";
import NotFound from "../components/Main-Admin/NotFound";
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
import Admin from "./FoodAdminPanel"

import GuessTheDishGame from "./GuessTheDishGame";

import { RecipePage } from "../components/scratch/RecipePage";


const AdminProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/main-admin/login" replace />;
  }
  
  return <>{children}</>;
};

export const ProjectRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* صفحه اصلی */}
        <Route path="/" element={<HomePage />} />

        {/* صفحه ادمین */}
        <Route path="/admin" element={<Admin />} />

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

        {/* بازی حدس غذا */}
        <Route path="/games/guess-the-dish" element={<GuessTheDishGame />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/model" element={<MenuBuilder />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
        <Route path="/main-admin/login" element={<MainLogin />} />
              <Route 
        path="/main-admin" 
        element={
          <AdminProtectedRoute>
            <Dashboard />
          </AdminProtectedRoute>
        } 
      />
            <Route 
        path="/main-admin/add-restaurant" 
        element={
          <AdminProtectedRoute>
            <AddRestaurant />
          </AdminProtectedRoute>
        } 
      />
            <Route 
        path="/main-admin/edit-restaurant/:id" 
        element={
          <AdminProtectedRoute>
            <EditRestaurant />
          </AdminProtectedRoute>
        } 
      />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
        {/* <Route path="/games" element={<GamesSection />} /> */}
      </Routes>
    </Router>
  );
};
