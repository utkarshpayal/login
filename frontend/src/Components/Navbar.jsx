import React from 'react';
import { Link } from 'react-router-dom';


function Navbar() {
  return (
    <div>
      <nav>
        <ul className='bg-blue-400 flex justify-between items-center h-20 px-10 rounded-xl text-xl'>
          <li>
            <Link to="/" className='text-white font-bold hover:text-red-400'>Home</Link>
          </li>
          <li>
            <Link to="/login" className='text-white font-bold hover:text-red-400'>Login</Link>
          </li>
          <li>
            <Link to="/signup" className='text-white font-bold hover:text-red-400'>Signup</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
