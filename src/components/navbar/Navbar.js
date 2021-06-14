import React from 'react';
import './Navbar.css';
import BTBLogo from '../../images/BTBLogo.png';

function Navbar() {
    return (
        <div className="navbar">
            <img src={BTBLogo} alt="Invalid img" />
        </div>
    );
}

export default Navbar;