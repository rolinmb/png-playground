import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav>
      <ul className='navbar-list'>
        <li className='navbar-list-item'><Link className='navbar-link' to='/welcome'>Welcome</Link></li>
        <li className='navbar-list-item'><Link className='navbar-link' to='/generator'>Classic Generator</Link></li>
        <li className='navbar-list-item'><Link className='navbar-link' to='/modgenerator'>Modular Generator</Link></li>
        <li className='navbar-list-item'><Link className='navbar-link' to='/editor'>Editor</Link></li>
        <li className='navbas-list-item'><Link className='navbar-link' to='/interpolator'>Interpolator</Link></li>
      </ul>
    </nav>
  );
}

export default Nav;