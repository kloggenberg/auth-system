import styled from 'styled-components';

export const StyledButton = styled.button`
  padding: 0.75rem 1.25rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  background-color: #2563eb;
  color: white;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #1d4ed8;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;