import { Outlet } from 'react-router-dom';
import { TabBar } from '../../components/tabBar';
import { useSelector } from 'react-redux';
import { ImSpinner6 } from 'react-icons/im';

const StudentLayout = () => {
  const { isLoading } = useSelector((store) => store.user);

  if (isLoading) {
    return (
      <div className="spinner-container">
        <ImSpinner6 className="spinner" />
      </div>
    );
  }

  return (
    <>
      <TabBar />

      <Outlet />
    </>
  );
};
export default StudentLayout;
