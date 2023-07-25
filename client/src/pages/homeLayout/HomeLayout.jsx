import { Navbar } from '../../components/navbar';
import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
  return (
    <>
      <Navbar />

      <Outlet />
    </>
  );
};
export default HomeLayout;
