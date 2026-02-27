import styled from 'styled-components';

export const PageWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-size: cover;
  background-position: center;
`;

export const AuthCard = styled.div`
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 48px 40px;
  width: 100%;
  max-width: 460px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 480px) {
    padding: 40px 28px;
    border-radius: 0;
    max-width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

export const AuthBranding = styled.div`
  text-align: center;
  margin-bottom: 40px;

  h1 {
    font-size: 32px;
    font-weight: 800;
    color: #1a202c;
    margin-bottom: 12px;
    letter-spacing: -0.5px;
  }

  p {
    font-size: 16px;
    color: #4a5568;
    margin: 0;
    line-height: 1.5;
  }
`;