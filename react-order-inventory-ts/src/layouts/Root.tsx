/* eslint-disable react-refresh/only-export-components */
import Error from '@/components/Error';

import Cook from '@/pages/Cook/Cook';
import { lazy } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Layout from './Layout';
import PrivateLayout from './PrivateLayout';
import PublicRoute from './PublicRoute';

const Home = lazy(() => import('@/pages/Home/Home'));
const About = lazy(() => import('@/pages/About/About'));
const Authentication = lazy(() => import('@/components/Authentication/Authentication'));
const Order = lazy(() => import('@/pages/Order/Order'));
const Inventory = lazy(() => import('@/pages/Inventory/Inventory'));
const Dashboard = lazy(() => import('@/pages/Dashboard/Dashboard'));
const Setup = lazy(() => import('@/pages/Setup/Setup'));
const User = lazy(() => import('@/pages/Customers/User'));
const Staffs = lazy(() => import('@/pages/Staffs/Staffs'));
const CodeGenerator = lazy(() => import('@/components/QRCode/CodeGenerator'));

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
    <Route path="/">
      <Route element={<PublicRoute />}>
        <Route index element={<Home />} />
        <Route path="auth" element={<Authentication />} />
      </Route>
      <Route element={<Layout />}>
        <Route path="home" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="order" element={<Order />} />
        <Route path="setup" element={<Setup />} />
        <Route path="cook" element={<Cook />} />
        <Route path="customers" element={<User />} />
        <Route element={<PrivateLayout />}>
          <Route path="users" element={<Staffs />} />
        </Route>
      </Route>
      <Route path="generator" element={<CodeGenerator />} />
      <Route path="*" element={<Error />} />
    </Route>
  )
);

export default router;
