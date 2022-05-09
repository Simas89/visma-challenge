import styled from "styled-components";
import { Button } from "@mui/material";

export const MuiButton = styled(Button).attrs((props) => ({
  ...props,
  variant: "contained",
}))`
  font-family: "Nunito";
  text-transform: none;
`;
