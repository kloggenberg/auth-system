import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { PageWrapper, AuthCard, AuthBranding } from './styles/Layout.styles';
import { InputWrapper, StyledLabel, StyledInput } from './styles/Input.styles';
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

export const RegisterPage = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newUser = {
      firstName,
      lastName,
      email,
      password,
    };

    localStorage.setItem('user', JSON.stringify(newUser));

    alert('Registration successful!');
    navigate('/');
  };

  return (
    <PageWrapper>
      <AuthCard>
        <AuthBranding>
          <h1>Create Account</h1>
          <p>Join us by filling out the details below.</p>
        </AuthBranding>

        <form onSubmit={handleSubmit}>
          <InputWrapper>
            <StyledLabel htmlFor="firstName">First Name</StyledLabel>
            <StyledInput
              id="firstName"
              type="text"
              placeholder="e.g. John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </InputWrapper>

          <InputWrapper>
            <StyledLabel htmlFor="lastName">Last Name</StyledLabel>
            <StyledInput
              id="lastName"
              type="text"
              placeholder="e.g. Doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </InputWrapper>

          <InputWrapper>
            <StyledLabel htmlFor="email">Email Address</StyledLabel>
            <StyledInput
              id="email"
              type="email"
              placeholder="e.g. name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              required
            />
          </InputWrapper>

          <StandardButton 
            label="Register"
            type="submit" 
          />
        </form>

        <RedirectText>
          Already have an account? <Link to="/">Sign in here</Link>
        </RedirectText>
      </AuthCard>
    </PageWrapper>
  );
};