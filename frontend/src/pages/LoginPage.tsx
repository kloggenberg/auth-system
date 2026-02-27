import React, { useState } from 'react';
import api from "../api";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { PageWrapper, AuthCard, AuthBranding } from './styles/Layout.styles';
import { InputWrapper, StyledLabel, StyledInput, ErrorMessage } from './styles/Input.styles';
import { StandardButton } from '../components/standard-button/StandardButton';

const RedirectText = styled.p`
  margin-top: 24px;
  font-size: 14px;
  color: #6B778C;
  text-align: center;
  a {
    color: #0052cc;
    text-decoration: none;
    font-weight: 600;
    &:hover { text-decoration: underline; }
  }
`;

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { setToken } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post("/Auth/login", {
        email,
        password,
      });
      console.log("Login sent")
      setToken(response.data.token);
      navigate('/user');
      console.log(response.data);
    } catch (err) {
      console.error(err);
      setError('Invalid email or password');
    }
  };

  return (
    <PageWrapper>
      <AuthCard>
        <AuthBranding>
          <h1>Welcome Back</h1>
          <p>Please enter your details to sign in.</p>
        </AuthBranding>

        <form onSubmit={handleSubmit}>
          <InputWrapper>
            <StyledLabel htmlFor="email">Email Address</StyledLabel>
            <StyledInput
              id="email"
              type="email"
              placeholder="e.g. name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              $hasError={!!error}
              required
            />
          </InputWrapper>

          <InputWrapper>
            <StyledLabel htmlFor="password">Password</StyledLabel>
            <StyledInput
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              $hasError={!!error}
              required
            />
          </InputWrapper>

          {error && <ErrorMessage style={{ marginBottom: '16px', display: 'block' }}>{error}</ErrorMessage>}

          {/* Using your StandardButton component here */}
          <StandardButton 
            label="Login"
            type="submit" 
          />
        </form>

        <RedirectText>
          Don't have an account? <Link to="/register">Create one here</Link>
        </RedirectText>
      </AuthCard>
    </PageWrapper>
  );
};