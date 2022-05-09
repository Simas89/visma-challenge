import { css } from "styled-components";

export const actionIconStyle = (color: string) => {
  return css`
    font-size: 30px;
    opacity: 0.5;
    cursor: pointer;
    color: ${color};

    &:hover {
      opacity: 0.8;
    }
  `;
};
