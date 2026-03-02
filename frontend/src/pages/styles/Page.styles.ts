import styled from "styled-components";

export const InfoGroup = styled.div`
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f4f5f7;
  text-align: left;
`;

export const Label = styled.span`
  display: block;
  font-size: 12px;
  font-weight: 700;
  color: #6b778c;
  text-transform: uppercase;
  margin-bottom: 4px;
`;

export const Value = styled.span`
  display: block;
  font-size: 16px;
  color: #172b4d;
  font-weight: 500;
`;

export const RedirectText = styled.p`
  margin-top: 24px;
  font-size: 14px;
  color: #6B778C; /* Subtle gray */
  text-align: center;

  a {
    color: #0052cc; /* Professional Blue */
    text-decoration: none;
    font-weight: 600;
    transition: color 0.2s ease;

    &:hover {
      text-decoration: underline;
      color: #0747a6; /* Darker blue on hover */
    }
  }
`;

export const ErrorMessage = styled.span`
  display: block;
  background-color: #FFEBE6; /* Very light red/pink background */
  color: #DE350B;            /* Strong error red */
  font-size: 12px;
  font-weight: 600;
  margin-top: 8px;
  margin-bottom: 16px;
  padding: 8px 12px;
  border-radius: 3px;
  border-left: 3px solid #DE350B; /* Accent line to make it look like an alert */
  
  /* Smoothly appear if you add a transition */
  animation: fadeIn 0.2s ease-in;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-5px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;