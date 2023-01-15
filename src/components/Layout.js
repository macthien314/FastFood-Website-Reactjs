import React, { useEffect } from "react";

import Header from "./Header";
import Footer from "./Footer";
import Routes from "../routes/Routers";

import Carts from "./UI/cart/Carts.js";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../redux/reducers/ProductReducer";
import { getCategory } from "../redux/reducers/CategoryReducer";

const Layout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProduct());
    dispatch(getCategory());
  }, [dispatch]);
  const showCart = useSelector((state) => state.cartUi.cartIsVisible);
 
  return (
    <div>
      <Header />

      {showCart && <Carts />}

      <div>
        <Routes />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
