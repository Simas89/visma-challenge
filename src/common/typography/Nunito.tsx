import styled, { css } from "styled-components";
import { Typography } from "@mui/material";
import "@fontsource/nunito";
import "@fontsource/nunito/200.css";
import "@fontsource/nunito/300.css";
import "@fontsource/nunito/400.css";
import "@fontsource/nunito/500.css";
import "@fontsource/nunito/600.css";
import "@fontsource/nunito/700.css";
import "@fontsource/nunito/800.css";
import "@fontsource/nunito/900.css";

interface FontProps {
  weight?:
    | "normal"
    | "bold"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
  customcolor?: string;
  style?: "normal" | "italic";
}

export const Nunito = styled(Typography)<FontProps>`
  font-family: "Nunito", sans-serif !important;
  margin: 0 !important;

  ${({ customcolor }) =>
    customcolor &&
    css`
      color: ${customcolor} !important;
    `};

  ${({ weight }) =>
    weight &&
    css`
      font-weight: ${weight} !important;
    `};

  ${({ style }) =>
    style &&
    css`
      font-style: ${style} !important;
    `};
`;
