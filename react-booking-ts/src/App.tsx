import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Suspense, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import Loader from './components/Spinner/Loader';
import { checkUserSession } from './hooks/api/AuthAPI';
import router from './layouts/Root';
import { ThemeProvider } from './layouts/ThemeProvider';
import { useStore } from './store/store';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 1000,
    },
  },
});

function App() {
  const path = window.location.pathname;
  const clearUserLoginData = useStore(useShallow((state) => state.clearUserLoginData));
  useEffect(() => {
    const checkCurrentUserSession = async () => {
      const data = await checkUserSession();
      if (data.session === null) {
        clearUserLoginData();
      }
    };

    checkCurrentUserSession();
  }, [path, clearUserLoginData]);
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Suspense fallback={<Loader />}>
          <RouterProvider router={router} />
          <Toaster
            position={'bottom-left'}
            gutter={8}
            toastOptions={{
              className:
                'bg-slate-100 text-blue-950 dark:text-slate-50 dark:bg-slate-900 rounded-full p-4 drop-shadow-lg',
              duration: 3000,
            }}
          />
        </Suspense>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
