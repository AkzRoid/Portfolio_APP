//frontend/src/components/ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../context/AuthContext';

// Usage:
// <ProtectedRoute> → requires member or admin role
// <ProtectedRoute allowedRoles={['admin']}> → requires admin role
// <ProtectedRoute allowedRoles={['member', 'admin', 'guest']}> → allows specific roles
const ProtectedRoute = ({ children, allowedRoles = ['member', 'admin'] }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to='/home' replace />;
  if (!allowedRoles.includes(user.role)) return <Navigate to='/home' replace />;
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
};

export default ProtectedRoute;