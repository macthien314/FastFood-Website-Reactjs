
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { logout } from '../../../redux/reducers/authReducer';
import './nav.css'
const NavbarHeader = () => {

    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());

    };
    return (
        <Nav className='navbar-side' vertical>
            <NavItem >
                <Link to="/dashboard">
                    <span className='d-flex align-item-center gap-2'> <i className="ri-dashboard-3-fill"></i>Dashboard</span>
                </Link>
            </NavItem>
            <NavItem>
                <Link to="/product">
                    <span className='d-flex align-item-center gap-2'> <i className="ri-file-text-fill"></i>Manage Product</span>
                </Link>
            </NavItem>
            <NavItem>
                <Link to="/category">
                    <span className='d-flex align-item-center gap-2'> <i className="ri-file-text-fill"></i>Manage Category</span>
                </Link>
            </NavItem>
            <NavItem>
                <Link to="/users">
                    <span className='d-flex align-item-center gap-2'> <i className="ri-file-text-fill"></i>Manage User</span>
                </Link>
            </NavItem>
            <NavItem>
                <Link onClick={handleLogout} to="/">
                    <span className='d-flex align-item-center gap-2'> <i className="ri-logout-box-r-line"></i>Logout</span>

                </Link>
            </NavItem>

        </Nav>

    );
};

export default NavbarHeader;