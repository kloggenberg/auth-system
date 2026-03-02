import React, { useState } from 'react';
import api from "../api";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from 'react-router-dom';
import { StandardButton } from '../components/standard-button/StandardButton';
import { ErrorMessage } from './styles/Page.styles';
import { AuthLayout } from '../components/auth-layout/AuthLayout';
import { FormInput } from '../components/form-input/FormInput';
import { RedirectText } from './styles/Page.styles';

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
      const response = await api.post("/Auth/login", { email, password });
      setToken(response.data.token);
      navigate('/user');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Please enter your details to sign in."
    >
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email Address"
          id="email"
          type="email"
          placeholder="e.g. name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
          required
        />

        <FormInput
          label="Password"
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={error}
          required
        />

        {error && (
          <ErrorMessage style={{ marginBottom: '16px', display: 'block' }}>
            {error}
          </ErrorMessage>
        )}

        <StandardButton label="Login" type="submit" />
      </form>

      <RedirectText>
        Don't have an account? <Link to="/register">Create one here</Link>
      </RedirectText>
    </AuthLayout>
  );
};