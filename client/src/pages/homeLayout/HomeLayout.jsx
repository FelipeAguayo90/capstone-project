import { LogoutModal } from '../../components/logoutModal';
import { Navbar } from '../../components/navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import { DltStdModal } from '../../components/dltStdModal';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isUser, getProfilePhoto } from '../../features/user/userSlice';
import { getCourses } from '../../features/courseCard/courseCardSlice';

const HomeLayout = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCourses());
    dispatch(getProfilePhoto());
  }, [user]);

  useEffect(() => {
    dispatch(getProfilePhoto());
    dispatch(isUser()).then((res) => {
      const isAdmin = res.payload.is_admin;
      if (isAdmin) {
        return navigate('/admin/dashboard');
      }
      return navigate('/student/dashboard');
    });
  }, []);
  return (
    <div className="home-layout">
      <DltStdModal />
      <LogoutModal />
      <Navbar />
      <Outlet />
    </div>
  );
};
export default HomeLayout;
