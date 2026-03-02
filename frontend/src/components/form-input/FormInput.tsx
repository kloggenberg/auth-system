import type { FormInputProps } from "./FormInput.types";
import { InputWrapper, StyledInput, StyledLabel } from "./styles/FormInput.styles";

export const FormInput = ({ label, id, error, ...props }: FormInputProps) => (
  <InputWrapper>
    <StyledLabel htmlFor={id}>{label}</StyledLabel>
    <StyledInput id={id} $hasError={!!error} {...props} />
  </InputWrapper>
);