import { LogoutModal } from '../../components/logoutModal';
import { Navbar } from '../../components/navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import { DltStdModal } from '../../components/dltStdModal';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isUser } from '../../features/user/userSlice';
import { getCourses } from '../../features/courseCard/courseCardSlice';

const HomeLayout = () => {
  const navigate = useNavigate();
  const { is_admin, user } = useSelector((store) => store.user.user);
  const dispatch = useDispatch();
  console.log(is_admin);
  useEffect(() => {
    dispatch(getCourses());
  }, [user]);

  useEffect(() => {
    dispatch(isUser()).then(() => {
      if (is_admin) {
        return navigate('/admin/dashboard');
      }
      return navigate('/student/dashboard');
    });
  }, []);
  return (
    <>
      <DltStdModal />
      <LogoutModal />
      <Navbar />
      <Outlet />
    </>
  );
};
export default HomeLayout;
