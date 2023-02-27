
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/reducers/authReducer';
import './nav.css'
import NavBrand from '../header/Header';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';


const NavbarHeader = (props) => {

  const user = useSelector(state => state.auth.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav>
      <div className="sidebar-button">
        <i className="bx bx-menu sidebarBtn" />

        <NavBrand name={props.name} />
      </div>
     
      <div className="fs-3">
        <UncontrolledDropdown group >
          <i  className="ri-user-fill fs-3 "></i>
          <DropdownToggle className='dropdown-toggle dropdown-toggle-split border-0 d-flex align-items-center' color="#f1f0f0" />
          <DropdownMenu>
            <DropdownItem header>
              {user?.username || 'Header'}
            </DropdownItem>
            <DropdownItem className="fs-6 d-flex align-items-center gap-1 mt-1" >
              <i className="ri-user-fill"></i> <span >User Profile</span>
            </DropdownItem>
            <DropdownItem onClick={handleLogout} className="fs-6 d-flex align-items-center gap-1 mt-1">
              <i className="ri-logout-box-r-line"></i> <span >Logout</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    </nav>
  );
};

export default NavbarHeader;