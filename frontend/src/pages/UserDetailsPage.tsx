import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PageWrapper, AuthCard, AuthBranding } from './styles/Layout.styles';
import { StandardButton } from '../components/standard-button/StandardButton';

const InfoGroup = styled.div`
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f4f5f7;
  text-align: left;

  &:last-of-type {
    border-bottom: none;
    margin-bottom: 30px;
  }
`;

const Label = styled.span`
  display: block;
  font-size: 12px;
  font-weight: 700;
  color: #6B778C;
  text-transform: uppercase;
  margin-bottom: 4px;
`;

const Value = styled.span`
  display: block;
  font-size: 16px;
  color: #172B4D;
  font-weight: 500;
`;

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

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  return (
    <PageWrapper>
      <AuthCard>
        <AuthBranding>
          <h1>Account Profile</h1>
          <p>Logged in as {user?.firstName}</p>
        </AuthBranding>

        {user ? (
          <>
            <InfoGroup>
              <Label>Full Name</Label>
              <Value>{user.firstName} {user.lastName}</Value>
            </InfoGroup>

            <InfoGroup>
              <Label>Email Address</Label>
              <Value>{user.email}</Value>
            </InfoGroup>

            <InfoGroup>
              <Label>Account Status</Label>
              <Value>Active</Value>
            </InfoGroup>

            <StandardButton 
              label="Log Out" 
              onClick={handleLogout}
            />
          </>
        ) : (
          <p>Loading user data...</p>
        )}
      </AuthCard>
    </PageWrapper>
  );
};