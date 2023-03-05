import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from '../../../components/dashboard/navbar/NavbarHeader';
import Sidebar from '../../../components/dashboard/sidebar/Sidebar';
import { getUser } from '../../../redux/reducers/UserReducer';

import "./home.css";
const Home = ({ children, ...props }) => {
 
  useEffect(() => {

    let sidebar = document.querySelector(".sidebar");
    let sidebarBtn = document.querySelector(".sidebarBtn");
    sidebarBtn.onclick = function () {
      sidebar.classList.toggle("active");
      if (sidebar.classList.contains("active")) {
        sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
      } else
        sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
    }

  })
  return (
    <div className="w-100 ">

      <Sidebar />
      <section className="home-section">
        <Navbar name = {props.name}/>
        {children}
     

      </section>
    </div>

  );
};

export default Home;