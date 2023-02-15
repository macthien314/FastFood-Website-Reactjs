
import React from 'react';
import "./header.css"
import {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,

    UncontrolledDropdown,

} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/reducers/authReducer';
import { useNavigate } from 'react-router-dom';
const Header = (props) => {
    const user = useSelector(state => state.auth.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <div className='row'>
            <div className="col-lg-6 ">
                <h1 className="page-header">{props.name}</h1>
            </div>
            <div className="col-lg-6 d-flex align-items-center justify-content-end">
                <UncontrolledDropdown group >
                    <i className="ri-user-fill "></i>
                    <DropdownToggle className='dropdown-toggle dropdown-toggle-split border-0 d-flex align-items-center' color="#f1f0f0" />
                    <DropdownMenu>
                        <DropdownItem header>
                            {user?.username || 'Header'}
                        </DropdownItem>
                        <DropdownItem className="fs-6 d-flex align-items-center gap-1" >
                            <i className="ri-user-fill"></i> <span className='mt-1'>User Profile</span>
                        </DropdownItem>
                        <DropdownItem onClick={handleLogout} className="fs-6 d-flex align-items-center gap-1">
                            <i className="ri-logout-box-r-line"></i> <span className='mt-1'>Logout</span>
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </div>
        </div>
    );
};

export default Header;