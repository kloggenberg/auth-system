import React from 'react';
import { StyledButton } from './styles/StandardButton.styles';
import type { StandardButtonProps } from './StandardButton.types';

export const StandardButton: React.FC<StandardButtonProps> = ({
  label,
  ...rest
}) => {
  return (
    <StyledButton {...rest}>
      {label}
    </StyledButton>
  );
};