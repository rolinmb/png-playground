import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav>
      <ul className='navbar-list'>
        <li className='navbar-list-item'><Link className='navbar-link' to='/welcome'>Welcome</Link></li>
        <li className='navbar-list-item'><Link className='navbar-link' to='/generator'>Generator</Link></li>
        <li className='navbar-list-item'><Link className='navbar-link' to='/editor'>Editor</Link></li>
      </ul>
    </nav>
  );
}

export default Nav;