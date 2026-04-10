import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const isAuth = localStorage.getItem('eleve_admin_auth');
  
  // If not authenticated, redirect to login page
  if (!isAuth) {
    return <Navigate to="/admin/login" replace />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
