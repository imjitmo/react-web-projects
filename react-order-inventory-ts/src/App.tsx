import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import Loader from './components/Loader';
// import { Root } from './layouts/Root';

import router from './layouts/Root';
// const router = createBrowserRouter(Root);

function App() {
  return (
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
  );
}

export default App;
