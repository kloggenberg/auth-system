import React from 'react';
import { PageWrapper, AuthCard, AuthBranding } from './styles/AuthLayout.styles';
import type { AuthLayoutProps } from './AuthLayout.types';


export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <PageWrapper>
      <AuthCard>
        <AuthBranding>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </AuthBranding>
        {children}
      </AuthCard>
    </PageWrapper>
  );
};