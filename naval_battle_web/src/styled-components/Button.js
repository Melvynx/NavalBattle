import styled from 'styled-components';
import { getColorTheme } from './props';

/*
 * {color} "primary" | "secondary" Default : "primary"
 * {size} "small" | "normal" Default "normal"
 */
const ButtonOutlined = styled.button`
  background-color: transparent;
  border: 1px solid ${(props) => getColorTheme(props).main};
  padding: 8px;
  border-radius: 2px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: border 0.1s ease-in;
  &:hover {
    border: 1px solid ${(props) => getColorTheme(props).light};
  }
  &:focus {
    box-shadow: 0 0 0 0.15rem ${(props) => getColorTheme(props).light};
  }
`;

export { ButtonOutlined };
