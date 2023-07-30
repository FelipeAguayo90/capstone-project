import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedAdminRoute = ({ children }) => {
  const { user } = useSelector((store) => store.user);

  console.log(user);
  if (!user.is_admin) {
    return <Navigate to="/login" />;
  }
  return children;
};
export default ProtectedAdminRoute;
