import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  openDash,
  openCourses,
  openAccount,
} from '../../features/tabBar/tabBarSlice';

const TabBar = () => {
  const { is_admin } = useSelector((store) => store.user);
  const { isDash, isCourses, isAccount } = useSelector((store) => store.tabBar);
  const dispatch = useDispatch();
  console.log(isDash);

  return (
    <section className="tab-container">
      <div className={isDash ? 'active-div tab' : 'tab'}>
        <NavLink
          to={is_admin ? '/admin/dashboard' : '/student/dashboard'}
          onClick={() => dispatch(openDash())}
        >
          Dashboard
        </NavLink>
      </div>
      <div className={isCourses ? 'active-div tab' : 'tab'}>
        <NavLink
          to={is_admin ? '/admin/courses' : '/student/courses'}
          onClick={() => dispatch(openCourses())}
        >
          Courses
        </NavLink>
      </div>
      <div className={isAccount ? 'active-div tab' : 'tab'}>
        <NavLink
          to={is_admin ? '/admin/account' : '/student/account'}
          onClick={() => dispatch(openAccount())}
        >
          Account
        </NavLink>
      </div>
    </section>
  );
};
export default TabBar;
