import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export enum ThemeColors {
  PRIMARY = "#2E4057",
  SECONDARY = "#e70642",
  STROKE = "#E9ECFF",
  CADET_BLUE = "#9EA5B7",
  PRUSSIAN_BLUE = "#022033",
  ERROR = "#d32f2f",
}

const theme = createTheme({
  palette: {
    primary: {
      main: ThemeColors.PRIMARY,
    },
    secondary: { main: ThemeColors.SECONDARY },
  },
  components: {
    MuiButton: { defaultProps: { disableRipple: true } },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: ThemeColors.PRIMARY,
        },
      },
    },
  },

  typography: {
    fontFamily: "Roboto",
  },
});

export default responsiveFontSizes(theme);
