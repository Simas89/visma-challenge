import styled, { css } from "styled-components";
import { TextField } from "@mui/material";
import { ThemeColors } from "util/theme";

export const MuiTextField = styled(TextField)`
  outline: none;

  * {
    font-family: "Nunito" !important;
  }

  .MuiInputBase-root {
    background-color: ${({ theme }) => theme.palette.primary.main};
    border-radius: 0px;
  }
  input {
    padding: 13px 12px;
  }

  input,
  textarea {
    color: ${ThemeColors.STROKE};
  }
  & input::placeholder,
  textarea::placeholder {
    color: ${ThemeColors.STROKE};
  }

  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border: 2px solid rgba(0, 0, 0, 1);
    border-radius: 0px;
  }
  .MuiOutlinedInput-root:hover fieldset {
    border: 1px solid rgba(0, 0, 0, 1);
    border-radius: 0px;
  }
  .MuiOutlinedInput-notchedOutline {
    border: none;
  }

  .Mui-error {
    border-radius: 0px;
    border: 1px solid ${ThemeColors.ERROR};
  }
  .Mui-error.MuiOutlinedInput-root.Mui-focused
    .MuiOutlinedInput-notchedOutline {
    border-radius: 0px;
    border: 1px solid ${ThemeColors.ERROR};
  }
  .Mui-error.MuiOutlinedInput-root:hover fieldset {
    border: 1px solid ${ThemeColors.ERROR};
    border-radius: 0px;
  }

  .MuiFormHelperText-root {
    border: none;
    font-size: 12px;
    margin: 4px 0;
    font-weight: bold;
  }
`;
