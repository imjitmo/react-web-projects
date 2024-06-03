import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';

import Loader from './components/Loader';
// import { Root } from './layouts/Root';

import router from './layouts/Root';
// const router = createBrowserRouter(Root);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
        <Toaster
          position={'bottom-left'}
          gutter={8}
          toastOptions={{
            className: 'text-slate-50 bg-slate-950 rounded-full p-4 drop-shadow-lg',
            duration: 3000,
          }}
        />
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
