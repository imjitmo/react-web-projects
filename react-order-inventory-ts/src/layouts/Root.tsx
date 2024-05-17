/* eslint-disable react-refresh/only-export-components */
import Error from '@/components/Error';
import { lazy } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Layout from './Layout';
import PrivateLayout from './PrivateLayout';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

const Home = lazy(() => import('../pages/Home/Home'));
const About = lazy(() => import('../pages/About/About'));
const Authentication = lazy(() => import('../components/Authentication/Authentication'));
const Dashboard = lazy(() => import('../pages/Dashboard/Dashboard'));
const Products = lazy(() => import('../pages/Dashboard/Products/Products'));

// export const Root = [
//   {
//     element: <Layout />,
//     errorElement: <Error />,
//     children: [
//       {
//         path: '/',
//         element: <Home />,
//       },
//       {
//         path: '/about',
//         element: <About />,
//       },
//       {
//         path: '/authentication',
//         element: (
//           <PublicRoute>
//             <Authentication />
//           </PublicRoute>
//         ),
//       },
//       {
//         path: '/dashboard',
//         element: (
//           <ProtectedRoute>
//             <Dashboard />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: '/products',
//         element: (
//           <ProtectedRoute>
//             <Products />
//           </ProtectedRoute>
//         ),
//       },
//     ],
//   },
// ];

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route element={<PublicRoute />}>
        <Route path="auth" element={<Authentication />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<PrivateLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
        </Route>
      </Route>
      <Route path="*" element={<Error />} />
    </Route>
  )
);

export default router;
