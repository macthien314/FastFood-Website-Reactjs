
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import AllFoods from './pages/AllFoods';
import FoodDetails from './pages/FoodDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard/dashboard/Dashboard';
import Product from './pages/Dashboard/product/Product';
import Category from './pages/Dashboard/category/Category';
import AddProduct from './pages/Dashboard/product/AddProduct';
import EditProduct from './pages/Dashboard/product/EditProduct';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getToken, logOut } from './utils/auth';
import { authRefreshToken, authUpdateUser } from './store/auth/auth-slice';
import User from './pages/Dashboard/user/User';
import AddUser from './pages/Dashboard/user/AddUser';
import EditUser from './pages/Dashboard/user/EditUser';
import AddCategory from './pages/Dashboard/category/AddCategory';
import EditCategory from './pages/Dashboard/category/EditCategory';


import PageNotFound from './pages/Dashboard/pageNotFound/pageNotFound';
import UserProfile from './pages/Dashboard/profile/UserProfile';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
function App() {

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user && user.id) {
      const { access_token } = getToken();
      dispatch(
        authUpdateUser({
          user: user,
          accessToken: access_token,
        })
      );
    } else {
      const { refresh_token } = getToken();
      if (refresh_token) {
        dispatch(authRefreshToken(refresh_token));
      } else {
        dispatch(authUpdateUser({}));
        logOut();
      }
    }
  }, [dispatch, user]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/foods" element={<AllFoods />} />
      <Route path="/foods/:id" element={<FoodDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/contact" element={<Contact />} />

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/product" element={<Product />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/edit-product/:id" element={<EditProduct />} />

      <Route path="/category" element={<Category />} />
      <Route path="/add-category" element={<AddCategory />} />
      <Route path="/edit-category/:id" element={<EditCategory />} />

      <Route path="/users" element={<User />} />
      <Route path="/add-user" element={<AddUser />} />
      <Route path="/edit-user/:id" element={<EditUser />} />

      <Route path="/user-profile" element={<UserProfile />} />

      <Route path="/recovery" element={<ForgotPassword />} />

      <Route path="/reset_password" element={<ResetPassword/>} />

      <Route path="/page-404" element={<PageNotFound />} />
    </Routes>

  );
}

export default App;
