import React, { useState } from 'react';
import { FaAngleUp } from 'react-icons/fa';


import styled from 'styled-components';

const Button = styled.button`
    color: #df2020;
    border: 2px solid #df2020;
    width: 50px;
    height: 50px;
    font-size: 2rem;
    text-align: center;
    line-height: 34px;
    border-radius: 50%;
    position: fixed; 
    align-items: center ;
   left: 95%;
   bottom: 80px;
   font-size: 3rem;
   z-index: 1;
   cursor: pointer;
   color: linear-gradient(
    to right bottom, #1DC071, #A4D96C);
    @media only screen and (max-width: 1050px) {
        left: 93%;
}

@media only screen and (max-width: 800px) {
        left: 91%;
}

@media only screen and (max-width: 600px) {
        left: 89%;
}

@media only screen and (max-width: 577px) {
        left: 87%;
}

@media only screen and (max-width: 500px) {
        left: 84%;
}

@media only screen and (max-width: 420px) {
        left: 82%;
}
  
`
const ScrollButton = (props) => {

    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true)
        }
        else if (scrolled <= 300) {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
            /* you can also use 'auto' behaviour
               in place of 'smooth' */
        });
    };

    window.addEventListener('scroll', toggleVisible);

    return (
        <Button onClick={scrollToTop}
                style={{ display: visible ? 'inline' : 'none' }}>
            <FaAngleUp style={{ marginTop: '-4px'}} />
        </Button>
    );
}

export default ScrollButton;