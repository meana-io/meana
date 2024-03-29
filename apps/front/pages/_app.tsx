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
import 'react-toastify/dist/ReactToastify.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import { ToastContainer } from 'react-toastify';
import DrawerProvider from '@/contexts/drawerContext';

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
                  <DrawerProvider>
                    <Component {...pageProps} />
                  </DrawerProvider>
                </DashboardProvider>
              </AuthProvider>
            </ThemeProvider>
          </EmotionCacheProvider>
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default App;
