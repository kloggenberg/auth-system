import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserDetailsPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');

    if (!isAuthenticated) {
      navigate('/');
    }
  }, [navigate]);

  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  return (
    <div>
      <h1>User Details</h1>

      {user && (
        <>
          <p>First Name: {user.firstName}</p>
          <p>Last Name: {user.lastName}</p>
          <p>Email: {user.email}</p>
        </>
      )}
    </div>
  );
};