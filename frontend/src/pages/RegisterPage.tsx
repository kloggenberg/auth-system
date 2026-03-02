import React, { useState } from 'react';
import api from "../API/api";
import { useNavigate, Link } from 'react-router-dom';
import { StandardButton } from '../components/standard-button/StandardButton';
import { RedirectText, StatusMessage } from './styles/Page.styles'; 
import { AuthLayout } from '../components/auth-layout/AuthLayout';
import { FormInput } from '../components/form-input/FormInput';
import { ErrorIcon, SuccessIcon } from './icons/Icons';

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
      {status.text && (
        <StatusMessage $isSuccess={status.type === 'success'}>
          {status.type === 'success' ? <SuccessIcon /> : <ErrorIcon />}
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