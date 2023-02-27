
import React from 'react';
import "./sidebar.css"
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/reducers/authReducer';
import { Link, useNavigate } from 'react-router-dom';
const Header = (props) => {
   
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
     
        <div className="sidebar">
        <div className="logo-details">
          <i className="bx bxl-c-plus-plus" />
          <span className="logo_name">FastFood</span>
        </div>
        <ul className="nav-links">
          <li>
            {/* <Link to="/dashboard" className="active"> */}
            <Link to="/dashboard" className="">
              <i className="bx bx-grid-alt" />
              <span className="links_name">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/product">
              <i className="bx bx-box" />
              <span className="links_name">Product</span>
            </Link>
          </li>
          <li>
            <Link to="/category">
              <i className="bx bx-list-ul" />
              <span className="links_name">Category</span>
            </Link>
          </li>
          <li>
            <Link to="/users">
              <i className="bx bx-user" />
              <span className="links_name">User</span>
            </Link>
          </li>
          {/* <li>
            <a href="#">
              <i className="bx bx-pie-chart-alt-2" />
              <span className="links_name">Analytics</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-coin-stack" />
              <span className="links_name">Stock</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-book-alt" />
              <span className="links_name">Total order</span>
            </a>
          </li>
        
          <li>
            <a href="#">
              <i className="bx bx-message" />
              <span className="links_name">Messages</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-heart" />
              <span className="links_name">Favrorites</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-cog" />
              <span className="links_name">Setting</span>
            </a>
          </li> */}
          <li className="log_out" onClick={handleLogout}>
            <Link to="#" >
              <i className="bx bx-log-out" />
              <span className="links_name">Log out</span>
            </Link>
          </li>
        </ul>
      </div>
    );
};

export default Header;