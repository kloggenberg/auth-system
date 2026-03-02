import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../API/api";
import { useAuth } from "../context/AuthContext";
import { StandardButton } from "../components/standard-button/StandardButton";
import { InfoGroup, Label, Value } from "./styles/Page.styles";
import { AuthLayout } from "../components/auth-layout/AuthLayout";

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

export const UserDetailsPage = () => {
  const navigate = useNavigate();
  const { token, setToken } = useAuth();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await api.get("/Auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (err) {
        console.error("Session expired or invalid", err);
        setToken(null);
        navigate("/");
      }
    };

    fetchUser();
  }, [token, navigate, setToken]);

  const handleLogout = () => {
    setToken(null);
    navigate("/");
  };

  return (
    <AuthLayout 
      title="Account Profile" 
      subtitle={user ? `Logged in as ${user.email}` : "Loading..."}
    >
      {user ? (
        <>
          <InfoGroup>
            <Label>First Name</Label>
            <Value>{user.firstName}</Value>
          </InfoGroup>

          <InfoGroup>
            <Label>Last Name</Label>
            <Value>{user.lastName}</Value>
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
    </AuthLayout>
  );
};