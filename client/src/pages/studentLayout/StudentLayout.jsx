import { Outlet, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ImSpinner6 } from 'react-icons/im';
import { openModal } from '../../features/logoutModal/logoutModalSlice';
import { AiFillDashboard } from 'react-icons/ai';

import { FaUsers, FaBook, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

const StudentLayout = () => {
  const dispatch = useDispatch();

  const { isLoading, user } = useSelector((store) => store.user);

  if (isLoading) {
    return (
      <div className="spinner-container">
        <ImSpinner6 className="spinner" />
      </div>
    );
  }

  return (
    <div className="dash-container">
      <div className="student-course-bar">
        <div className="tabs">
          {user.profile_photo ? (
            <img src={user.profile_photo} />
          ) : (
            <FaUserCircle />
          )}
          <NavLink to="/student/account">account</NavLink>
        </div>
        <div className="tabs">
          <AiFillDashboard />
          <NavLink to="/student/dashboard">dashboard</NavLink>
        </div>
        <div className="tabs">
          <FaBook />
          <NavLink to="/student/courses">courses</NavLink>
        </div>
        <div
          onClick={() => {
            dispatch(openModal());
          }}
          className="tabs"
        >
          <FaSignOutAlt />
          <p>sign out</p>
        </div>
      </div>
      <section className="main-page">
        <Outlet />
      </section>
    </div>
  );
};
export default StudentLayout;
