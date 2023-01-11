import { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ErrorBoundary } from 'react-error-boundary';
import DashboardProvider from '@/contexts/dashboardContext';
import { CacheProvider as EmotionCacheProvider } from '@emotion/react';
import createEmotionCache from '@/utility/createEmotionCache';
import ThemeProvider from '@/styles/theme';
import StyledChart from '@/components/Chart/StyledChart';
import AuthProvider from '@/contexts/authContext';
const clientSideEmotionCache = createEmotionCache();

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            useErrorBoundary: true,
            refetchOnWindowFocus: false,
            retry: false,
            staleTime: 1000 * 30,
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
            <ErrorBoundary fallbackRender={<div>Error</div>}>
              <ThemeProvider>
                <StyledChart />
                <AuthProvider>
                  <DashboardProvider>
                    <Component {...pageProps} />
                  </DashboardProvider>
                </AuthProvider>
              </ThemeProvider>
            </ErrorBoundary>
          </EmotionCacheProvider>
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
};

export default App;
