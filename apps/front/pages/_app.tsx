import { useState } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { CacheProvider as EmotionCacheProvider } from '@emotion/react';

import createEmotionCache from '@/utility/createEmotionCache';
import ThemeProvider from '@/styles/theme';
import StyledChart from '@/components/Chart/StyledChart';

const clientSideEmotionCache = createEmotionCache();

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            useErrorBoundary: true,
          },
        },
      })
  );

  return (
    <div>
      <Head>
        <title>Meana</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <EmotionCacheProvider value={clientSideEmotionCache}>
            <ThemeProvider>
              <StyledChart />
              <Component {...pageProps} />
            </ThemeProvider>
          </EmotionCacheProvider>
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
};

export default App;
