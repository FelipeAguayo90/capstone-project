import { LogoutModal } from '../../components/logoutModal';
import { Navbar } from '../../components/navbar';
import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
  return (
    <>
      <LogoutModal />
      <Navbar />

      <Outlet />
    </>
  );
};
export default HomeLayout;
