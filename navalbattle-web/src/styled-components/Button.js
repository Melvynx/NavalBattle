import styled from 'styled-components';
import { getColorTheme } from './props';

/*
 * {color} "primary" | "secondary" Default : "primary"
 * {size} "small" | "normal" Default "normal"
 */
const Button = styled.button`
  background-color: ${(props) => getColorTheme(props).main};
  margin: ${(props) => props.margin || null};
  width: ${(props) => (props.fullWidth ? '100%' : null)};
  padding-top: 0.75rem;
  line-height: 1.5rem;
  padding-bottom: 0.75rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.1s ease-in;
  &:hover {
    background-color: ${(props) => getColorTheme(props).light};
  }
  &:focus {
    box-shadow: 0 0 0 0.15rem ${(props) => getColorTheme(props).light};
  }
`;

export { Button };
