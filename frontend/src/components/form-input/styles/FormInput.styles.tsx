import styled from 'styled-components';

export const InputWrapper = styled.div`
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const StyledLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #4a5568;
`;

interface InputProps {
  $hasError?: boolean;
}

export const StyledInput = styled.input<InputProps>`
  width: 100%;
  box-sizing: border-box; 
  padding: 12px 16px;
  border: 1px solid ${({ $hasError }) => ($hasError ? '#e53e3e' : '#cbd5e0')};
  border-radius: 8px;
  font-size: 15px;
  color: #2d3748;
  background: #cbd5e0; 
  transition: all 0.2s ease;
  outline: none;

  &::placeholder {
    color: #718096;
  }

  &:focus {
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
    background: white;
  }

  &:disabled {
    background: #edf2f7;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.p`
  color: #e53e3e;
  font-size: 13px;
  margin-top: 6px;
  margin-bottom: 0;
  text-align: left;
  width: 100%;
`;