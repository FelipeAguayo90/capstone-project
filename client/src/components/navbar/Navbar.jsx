import { NavLink } from 'react-router-dom';
import { HiBars4 } from 'react-icons/hi2';
import { RxAvatar } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../features/logoutModal/logoutModalSlice';
import {
  openMenu,
  closeMenu,
  toggleMenu,
} from '../../features/navbar/navbarSlice';

const Navbar = () => {
  const { user } = useSelector((store) => store.user);
  const { isMenuOpen } = useSelector((store) => store.navbar);
  const dispatch = useDispatch();

  return (
    <header className="header-fixed">
      <nav className={`nav-container ${isMenuOpen ? 'show' : ''}`}>
        <div className="navbar">
          <div>
            <p>MTEC</p>
          </div>
          <div>
            {user.user ? (
              <h4>{user.first_name}</h4>
            ) : (
              <NavLink
                onClick={() => {
                  dispatch(toggleMenu(isMenuOpen));
                }}
                to="/register"
              >
                enroll today
              </NavLink>
            )}

            <HiBars4
              className="h-20 w-20 menu-icon"
              onClick={() => {
                dispatch(toggleMenu(isMenuOpen));
              }}
            />
          </div>
        </div>

        <div className={`drop-down ${isMenuOpen ? 'show' : ''}`}>
          <ul className={`nav-links ${isMenuOpen ? 'show' : ''} `}>
            <li>
              <RxAvatar />
            </li>
            <li>
              <NavLink
                to="/"
                onClick={() => {
                  dispatch(toggleMenu(isMenuOpen));
                }}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/courses"
                onClick={() => {
                  dispatch(toggleMenu(isMenuOpen));
                }}
              >
                Courses
              </NavLink>
            </li>

            {!user.user ? (
              <li>
                <NavLink
                  to="/login"
                  onClick={() => {
                    dispatch(toggleMenu(isMenuOpen));
                  }}
                >
                  Login
                </NavLink>
              </li>
            ) : (
              <li
                onClick={() => {
                  dispatch(openModal());
                }}
              >
                <NavLink
                  onClick={() => {
                    dispatch(toggleMenu(isMenuOpen));
                  }}
                >
                  Logout
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
