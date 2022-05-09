import type { AppProps } from "next/app";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { EmotionCache } from "@emotion/cache";
import theme from "util/theme";
import createEmotionCache from "util/createEmotionCache";
import Layout from "components/Layout";
import { Provider } from "react-redux";
import { store } from "state";

const clientSideEmotionCache = createEmotionCache();

interface AppPropsEnchanted extends AppProps {
  emotionCache: EmotionCache;
}

const App = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: AppPropsEnchanted) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CacheProvider value={emotionCache}>
        <StyledThemeProvider theme={theme}>
          <CssBaseline />
          <Provider store={store}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Provider>
        </StyledThemeProvider>
      </CacheProvider>
    </MuiThemeProvider>
  );
};

export default App;
