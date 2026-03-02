import React, { useState } from 'react';
import api from "../api";
import { useNavigate, Link } from 'react-router-dom';
import { StandardButton } from '../components/standard-button/StandardButton';
import { RedirectText, StatusMessage } from './styles/Page.styles'; 
import { AuthLayout } from '../components/auth-layout/AuthLayout';
import { FormInput } from '../components/form-input/FormInput';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  // 1. Added message state
  const [status, setStatus] = useState<{ text: string; type: 'success' | 'error' | '' }>({
    text: '',
    type: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setStatus({ text: '', type: '' });

  // 1. Domain Validation Check
  if (!formData.email.toLowerCase().endsWith('@gmail.com')) {
    setStatus({ 
      text: "Only Gmail addresses are allowed at this time.", 
      type: 'error' 
    });
    return; // Stop the function here
  }

  try {
    await api.post("/Auth/register", formData);
    setStatus({ text: "Registration successful! Redirecting...", type: 'success' });
    setTimeout(() => navigate("/"), 2000);
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || "Registration failed.";
    setStatus({ text: errorMsg, type: 'error' });
  }
};

  return (
    <AuthLayout title="Create Account" subtitle="Join us by filling out the details below.">
      {/* 4. Render the inline message box */}
      {status.text && (
        <StatusMessage $isSuccess={status.type === 'success'}>
          {status.type === 'success' ? (
            <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          )}
          {status.text}
        </StatusMessage>
      )}

      <form onSubmit={handleSubmit}>
        <FormInput 
          label="First Name" id="firstName" type="text" 
          placeholder="e.g. John" value={formData.firstName} onChange={handleChange} required 
        />
        <FormInput 
          label="Last Name" id="lastName" type="text" 
          placeholder="e.g. Doe" value={formData.lastName} onChange={handleChange} required 
        />
        <FormInput 
          label="Email Address" id="email" type="email" 
          placeholder="e.g. name@example.com" value={formData.email} onChange={handleChange} required 
        />
        <FormInput 
          label="Password" id="password" type="password" 
          placeholder="••••••••" value={formData.password} onChange={handleChange} required 
        />

        <StandardButton label="Register" type="submit" />
      </form>

      <RedirectText>
        Already have an account? <Link to="/">Sign in here</Link>
      </RedirectText>
    </AuthLayout>
  );
};