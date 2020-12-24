import styled from 'styled-components';

export const TitleH2 = styled.h2`
  font-size: 32px;
  margin: 4px;
  color: ${(props) => props.theme.textPrimary};
  text-align: center;
`;

export const TitleH3 = styled.h2`
  font-size: 24px;
  margin: 2px;
  color: ${(props) => props.theme.textPrimary};
  text-align: center;
`;

export const Body = styled.p`
  font-size: 16px;
  margin: ${(props) => props.margin || '2px'};
  color: ${(props) => props.theme.textPrimary};
`;
