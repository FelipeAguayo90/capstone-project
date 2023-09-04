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
import { openDash } from '../../features/tabBar/tabBarSlice';

const Navbar = () => {
  const { user } = useSelector((store) => store.user);
  const { isDash } = useSelector((store) => store.tabBar);
  const { isMenuOpen } = useSelector((store) => store.navbar);
  const dispatch = useDispatch();

  return (
    <header className="header-fixed">
      <nav className={`nav-container ${isMenuOpen ? 'show' : ''}`}>
        <div className="navbar">
          <div className="logo">
            <p>MTEC</p>
          </div>
          <ul className="large">
            {user.user || (
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
            )}

            {user.user || (
              <li>
                <NavLink to="/courses">Courses</NavLink>
              </li>
            )}

            {user.user || (
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            )}

            {/* {!user.first_name ? (
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            ) : (
              <>
                {user.is_admin ? (
                  <li>
                    <NavLink
                      onClick={() => {
                        dispatch(openDash());
                      }}
                      to="admin/dashboard"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                ) : (
                  <li>
                    <NavLink
                      onClick={() => {
                        dispatch(openDash());
                      }}
                      to="student/dashboard"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                )}
              </>
            )} */}
          </ul>
          <div className="small">
            {user.first_name ? (
              <h4>{user.first_name}</h4>
            ) : (
              <NavLink to="/register">enroll today</NavLink>
            )}

            <HiBars4
              className="h-20 w-20 menu-icon"
              onClick={() => {
                dispatch(toggleMenu(isMenuOpen));
              }}
            />
          </div>
          <div className="large">
            {user.user ? (
              <p>hello {user.first_name}</p>
            ) : (
              <NavLink to="/register">enroll today</NavLink>
            )}
          </div>
        </div>

        <div className={`drop-down ${isMenuOpen ? 'show' : ''}`}>
          <ul className={`nav-links ${isMenuOpen ? 'show' : ''} `}>
            {user.user ? (
              <li>
                <RxAvatar />
              </li>
            ) : null}
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
            {user.user || (
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
            )}

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
              <>
                {user.user || (
                  <li>
                    <NavLink to="/login">Login</NavLink>
                  </li>
                )}
                {/* {user.is_admin ? (
                  <li>
                    <NavLink
                      to="admin/dashboard"
                      onClick={() => {
                        dispatch(toggleMenu(isMenuOpen));
                        dispatch(openDash());
                      }}
                    >
                      Dashboard
                    </NavLink>
                  </li>
                ) : (
                  <li>
                    <NavLink
                      to="student/dashboard"
                      onClick={() => {
                        dispatch(toggleMenu(isMenuOpen));
                        dispatch(openDash());
                      }}
                    >
                      Dashboard
                    </NavLink>
                  </li>
                )} */}
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
