import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Carts from "./UI/cart/Carts.js";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../redux/reducers/ProductReducer";
import { getCategory } from "../redux/reducers/CategoryReducer";
import { getUser } from "../redux/reducers/UserReducer";

const Layout = ({children}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProduct());
    dispatch(getCategory());
    dispatch(getUser());
  }, [dispatch]);
  const showCart = useSelector((state) => state.cartUi.cartIsVisible);
 
  return (
    <div>
      <Header />

      {showCart && <Carts />}

      <div>
      {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
