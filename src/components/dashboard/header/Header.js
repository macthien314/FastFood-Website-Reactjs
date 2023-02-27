import React from 'react';

const Header = (props) => {
    return (
        <div>
            <span className="dashboard fs-1">{props.name}</span>
        </div>
    );
};

export default Header;