/* eslint-disable react-refresh/only-export-components */
import Error from '@/components/Error';
import { lazy } from 'react';
import Layout from './Layout';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

const Home = lazy(() => import('../pages/Home/Home'));
const About = lazy(() => import('../pages/About/About'));
const Authentication = lazy(() => import('../components/Authentication/Authentication'));
const Dashboard = lazy(() => import('../pages/Dashboard/Dashboard'));
const Products = lazy(() => import('../pages/Dashboard/Products/Products'));

export const Root = [
  {
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/authentication',
        element: (
          <PublicRoute>
            <Authentication />
          </PublicRoute>
        ),
      },
      {
        path: '/dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: '/products',
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
    ],
  },
];
