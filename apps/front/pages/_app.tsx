import { useState } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import DashboardProvider from '@/contexts/dashboardContext';
import { CacheProvider as EmotionCacheProvider } from '@emotion/react';
import createEmotionCache from '@/utility/createEmotionCache';
import ThemeProvider from '@/styles/theme';
import StyledChart from '@/components/Chart/StyledChart';
import AuthProvider from '@/contexts/authContext';
import { useRouter } from 'next/router';
const clientSideEmotionCache = createEmotionCache();

const App = ({ Component, pageProps }: AppProps) => {
  const rotuer = useRouter();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
            staleTime: 1000 * 30,
            onError(error: any) {
              if (error?.response?.status === 401) {
                rotuer.push('/login');
              }
            },
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
              <AuthProvider>
                <DashboardProvider>
                  <Component {...pageProps} />
                </DashboardProvider>
              </AuthProvider>
            </ThemeProvider>
          </EmotionCacheProvider>
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
};

export default App;
