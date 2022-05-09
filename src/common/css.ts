import { css, FlattenSimpleInterpolation } from "styled-components";

type FlexCenter = (direction?: "row" | "column") => FlattenSimpleInterpolation;

export const flexCenter: FlexCenter = (direction = "row") => {
  return css`
    display: flex;
    flex-direction: ${direction};
    justify-content: center;
    align-items: center;
  `;
};

type Elipsis = (lines?: number) => FlattenSimpleInterpolation;

export const elipsis: Elipsis = (lines = 1) => {
  return css`
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: ${lines};
    -webkit-box-orient: vertical;
  `;
};
