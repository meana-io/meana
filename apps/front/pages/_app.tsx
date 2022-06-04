import { AppProps } from 'next/app';
import Head from 'next/head';

import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';

import createEmotionCache from '../utility/createEmotionCache';
import lightTheme from '../styles/theme/lightTheme';

const clientSideEmotionCache = createEmotionCache();

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Meana</title>
      </Head>
      <CacheProvider value={clientSideEmotionCache}>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}

export default CustomApp;
