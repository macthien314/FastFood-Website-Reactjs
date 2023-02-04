import React, { useRef, useEffect } from "react";

import { Container, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import logo from "../assets/images/res-logo.png";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { cartUiActions } from "../store/shopping-cart/cartUiSlice";

import "../styles/header.css";
import { logout } from "../redux/reducers/authReducer";


const nav__links = [
  {
    display: "Home",
    path: "/home",
  },
  {
    display: "Foods",
    path: "/foods",
  },
  {
    display: "Cart",
    path: "/cart",
  },
  {
    display: "Contact",
    path: "/contact",
  },
];

const Header = () => {

  const user = useSelector(state => state.auth.currentUser);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const menuRef = useRef(null);
  const headerRef = useRef();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
      dispatch(logout());
      navigate("/");
 
  };

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  const toggleCart = () => {
    dispatch(cartUiActions.toggle());
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("header__shrink");
      } else {
        headerRef.current.classList.remove("header__shrink");
      }
    });

    return () => window.removeEventListener("scroll", () => {

    });
  }, []);

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <div className="nav__wrapper d-flex align-items-center justify-content-between">
          <Link style={{cursor:'pointer'}} to='/' className="logo">
            <img src={logo} alt="logo" />
            <h5>Tasty Treat</h5>
          </Link>

          {/* ======= menu ======= */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <div className="menu d-flex align-items-center gap-5">
              {nav__links.map((item, index) => (
                <NavLink
                  to={item.path}
                  key={index}
                  className={(navClass) =>
                    navClass.isActive ? "active__menu" : ""
                  }
                >
                  {item.display}
                </NavLink>
              ))}
            </div>
          </div>

          {/* ======== nav right icons ========= */}
          <div className="nav__right d-flex align-items-center gap-4">
            <span className="cart__icon" onClick={toggleCart}>
              <i className="ri-shopping-basket-line"></i>
              <span className="cart__badge">{totalQuantity}</span>
            </span>

            <span className="user">

              <i className="ri-user-line">

              </i>

              <UncontrolledDropdown className="mb-2 " group>
                <DropdownToggle className='dropdown-toggle dropdown-toggle-split border-0 d-flex align-items-center p-0' color="#f1f0f0" />
                <DropdownMenu>
                  <DropdownItem header>
                    {user?.username || 'Header'}
                  </DropdownItem>
                  {!isLoggedIn &&
                    <Link to='/login'>
                      <DropdownItem style={{ height: '7vh' }} className=" d-flex align-items-center gap-1  py-4 " >
                       <i className="ri-user-fill mb-1"></i> Login
                      </DropdownItem>
                    </Link>
                  }

                  {isLoggedIn &&
                  <Link to='/dashboard'>
                    <DropdownItem style={{ height: '7vh' }} className=" d-flex align-items-center gap-1  py-4" >
                      <i className="ri-user-fill mb-1"></i>DashBoard

                    </DropdownItem>
                  </Link>
                }
                {!isLoggedIn &&
                  <Link to='/register'>
                  <DropdownItem style={{ height: '7vh' }} className=" d-flex align-items-center gap-1 py-4">
                    <i className="ri-settings-2-fill"></i>Register
                  </DropdownItem>
                  </Link>
                }
                  <DropdownItem onClick={handleLogout} style={{ height: '7vh' }} className=" d-flex align-items-center gap-1  py-4">
                    <i className="ri-logout-box-r-line"></i>Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

            </span>




            <span className="mobile__menu" onClick={toggleMenu}>
              <i className="ri-menu-line"></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
