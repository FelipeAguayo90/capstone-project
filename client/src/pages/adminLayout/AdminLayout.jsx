import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ImSpinner6 } from 'react-icons/im';
import { TabBar } from '../../components/tabBar';
const AdminLayout = () => {
  const { isLoading } = useSelector((store) => store.user);
  console.log(isLoading);
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
export default AdminLayout;

{
  /* <div class="spinner-container">
  <div class="spinner"></div>
</div>; */
}
