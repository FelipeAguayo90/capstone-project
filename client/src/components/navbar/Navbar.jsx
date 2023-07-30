import { NavLink } from 'react-router-dom';
import { HiBars4 } from 'react-icons/hi2';
import { RxAvatar } from 'react-icons/rx';
import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className={`nav-container ${isMenuOpen ? 'show' : ''}`}>
      <div>
        <p>MTEC</p>
      </div>
      <div>
        {/* <h3>{user ? user : null}</h3> */}
        <RxAvatar />
      </div>

      <div className={`drop-down ${isMenuOpen ? 'show' : ''}`}>
        <HiBars4 className="h-20 w-20 menu-icon" onClick={toggleMenu} />
        <ul className={`nav-links ${isMenuOpen ? 'show' : ''} `}>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/courses">Courses</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
