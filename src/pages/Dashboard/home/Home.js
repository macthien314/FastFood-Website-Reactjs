import React from 'react';
import { Col, Row } from 'reactstrap';
import Navbar from '../../../components/dashboard/navbar/NavbarHeader';
// import Sidebar from '../../../components/dashboard/header/Header';
// import "./home.scss";
const Home = ({ children }) => {
  return (
    <div className="w-100 wapper">
      {/* <Sidebar /> */}
      <Row className='w-100'>
        <Col xs="2" className='vh-100'>
          <Navbar />
        </Col>
        <Col xs="10" className='p-0'>
          {children}
        </Col>
      </Row>
    </div>
   
  );
};

export default Home;