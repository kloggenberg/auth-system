import React, { useState } from 'react';
import api from "../api";
import { useNavigate, Link } from 'react-router-dom';
import { StandardButton } from '../components/standard-button/StandardButton';
import { RedirectText } from './styles/Page.styles'; // Move this to your styles file!
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/Auth/register", formData);
      alert("Registration successful!");
      navigate("/");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <AuthLayout title="Create Account" subtitle="Join us by filling out the details below.">
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