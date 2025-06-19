import { Navigate } from 'react-router-dom';

function PrivateRoute({ children, role }) {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  const normalizedRole = role?.toLowerCase();
  const normalizedUserRole = userRole?.toLowerCase();

  if (!token) {
    return <Navigate to={normalizedRole === 'staff' ? '/login' : '/patient/login'} replace />;
  }

  if (normalizedRole && normalizedUserRole !== normalizedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PrivateRoute;
