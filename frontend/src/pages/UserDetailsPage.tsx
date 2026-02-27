import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import styled from "styled-components";
import { PageWrapper, AuthCard, AuthBranding } from "./styles/Layout.styles";
import { StandardButton } from "../components/standard-button/StandardButton";

const InfoGroup = styled.div`
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f4f5f7;
  text-align: left;
`;

const Label = styled.span`
  display: block;
  font-size: 12px;
  font-weight: 700;
  color: #6b778c;
  text-transform: uppercase;
  margin-bottom: 4px;
`;

const Value = styled.span`
  display: block;
  font-size: 16px;
  color: #172b4d;
  font-weight: 500;
`;

export const UserDetailsPage = () => {
  const navigate = useNavigate();
  const { token, setToken } = useAuth();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    async function fetchUser() {
      try {
        const response = await api.get("/Auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      } catch {
        navigate("/");
      }
    }

    fetchUser();
  }, [token, navigate]);

  const handleLogout = () => {
    setToken(null);
    navigate("/");
  };

  return (
    <PageWrapper>
      <AuthCard>
        <AuthBranding>
          <h1>Account Profile</h1>
          <p>{user ? `Logged in as ${user.email}` : "Loading..."}</p>
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

            <StandardButton label="Log Out" onClick={handleLogout} />
          </>
        ) : (
          <p>Loading user data...</p>
        )}
      </AuthCard>
    </PageWrapper>
  );
};