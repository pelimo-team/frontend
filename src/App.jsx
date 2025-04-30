import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import HomePage from './HomePage';
import Login from './Login';
import Signup from './Signup';
import ForgotPassword from './ForgotPassword';
import SetNewPassword from './SetNewPassword';
import EnterCode from './entercode';
import EnterCodeSignup from './EnterCodeSignup';
import UserProfile from './Userprofile';
import Restaurant from './Restaurant';
import Search from './Search';
import AdvancedSearch from './AdvancedSearch';
import AddComment from './AddComment';
import AddCommentPage from './AddCommentPage';
import FoodPage from './FoodPage';
import NightWalker from './NightWalker';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/set-new-password" element={<SetNewPassword />} />
          <Route path="/enter-code" element={<EnterCode />} />
          <Route path="/enter-code-signup" element={<EnterCodeSignup />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/restaurant/:id" element={<Restaurant />} />
          <Route path="/food/:id" element={<FoodPage />} />
          <Route path="/foodpage/:id" element={<Navigate to={location => `/food/${location.params.id}`} replace />} />
          <Route path="/search" element={<Search />} />
          <Route path="/advanced-search" element={<AdvancedSearch />} />
          <Route path="/add-comment" element={<AddComment />} />
          <Route path="/add-comment-page" element={<AddCommentPage />} />
          <Route path="/nightwalker" element={<NightWalker />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App; 