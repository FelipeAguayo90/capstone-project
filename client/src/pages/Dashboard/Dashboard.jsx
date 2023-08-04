import { useSelector, useDispatch } from 'react-redux';

const Dashboard = () => {
  const { isLoading } = useSelector((store) => store.user);
  console.log(isLoading);
  return <div>userDashDashboard</div>;
};
export default Dashboard;
