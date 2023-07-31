import { NavLink } from 'react-router-dom';
import { HiBars4 } from 'react-icons/hi2';
import { RxAvatar } from 'react-icons/rx';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../features/logoutModal/logoutModalSlice';

const Navbar = () => {
  const { user } = useSelector((store) => store.user);
  // const { isOpen } = useSelector((store) => store.logoutModal);
  const dispatch = useDispatch();

  console.log(user.username);
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
        {`${user.first_name ? user.first_name : ''}`}
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
          {user.first_name ? (
            <li
              onClick={() => {
                dispatch(openModal());
              }}
            >
              Logout
            </li>
          ) : (
            <></>
          )}
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
