import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import Loader from './components/Loader';
// import { Root } from './layouts/Root';

import router from './layouts/Root';
// const router = createBrowserRouter(Root);

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
