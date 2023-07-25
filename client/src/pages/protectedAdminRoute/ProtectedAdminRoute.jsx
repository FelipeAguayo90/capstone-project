import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ children, user }) => {
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};
export default ProtectedAdminRoute;
