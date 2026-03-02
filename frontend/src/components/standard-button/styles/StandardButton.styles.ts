import styled from 'styled-components';

export const StyledButton = styled.button`
  width: 100%; 
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  background-color: #2563eb;
  color: white;
  transition: all 0.2s ease;
  
  display: block;
  margin: 0 auto;

  &:hover {
    background-color: #1d4ed8;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;