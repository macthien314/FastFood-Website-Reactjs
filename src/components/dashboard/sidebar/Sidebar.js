
import React, { useState } from 'react';
import "./sidebar.css"
import {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Navbar,

    NavbarBrand,
    UncontrolledDropdown,

} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/reducers/authReducer';
import { useNavigate } from 'react-router-dom';
const Sidebar = (args) => {
    const user = useSelector(state => state.auth.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <div>
            <Navbar className='navbar-default'>
                <NavbarBrand className='ms-1 fs-3 fw-bold ' href="/">FastFood Admin</NavbarBrand>
        
                <UncontrolledDropdown group>
                    <i className="ri-user-fill d-flex align-items-center"></i>
                    <DropdownToggle className='dropdown-toggle dropdown-toggle-split border-0 d-flex align-items-center' color="#f1f0f0" />
                    <DropdownMenu>
                        <DropdownItem  header>
                        {user?.username || 'Header'}
                        </DropdownItem>
                        <DropdownItem  className="fs-6 d-flex align-items-center gap-1" >
                        <i className="ri-user-fill"></i> <span className='mt-1'>User Profile</span>
                        </DropdownItem>
                        <DropdownItem onClick={handleLogout}  className="fs-6 d-flex align-items-center gap-1">
                        <i className="ri-logout-box-r-line"></i> <span className='mt-1'>Logout</span> 
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>



            </Navbar>
        </div>
    );
};

export default Sidebar;