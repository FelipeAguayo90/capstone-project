import { Navigate } from 'react-router-dom';

const ProtectedStntRoute = ({ children, user }) => {
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};
export default ProtectedStntRoute;
