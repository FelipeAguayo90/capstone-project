import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedStntRoute = ({ children }) => {
  const { user } = useSelector((store) => store.user);

  console.log(user);
  if (!user.user) {
    return <Navigate to="/login" />;
  }
  return children;
};
export default ProtectedStntRoute;
