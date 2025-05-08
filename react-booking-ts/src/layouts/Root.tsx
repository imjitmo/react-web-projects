import Error from '@/components/Error/Error';
import { lazy } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import AdminRoute from './AdminRoute';
import GuestRoute from './GuestRoute';
import Layout from './Layout';
import PublicRoute from './PublicRoute';

const Homepage = lazy(() => import('@/pages/Homepage/Homepage'));
const Authentication = lazy(() => import('@/components/Authentication/Authentication'));
const Rooms = lazy(() => import('@/pages/Admin/Rooms/Rooms'));
const Dashboard = lazy(() => import('@/pages/Admin/Dashboard/Dashboard'));
const Reservations = lazy(() => import('@/pages/Admin/Reservation/Reservations'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<PublicRoute />}>
        <Route index element={<Homepage />} />
        <Route path="auth" element={<Authentication />} />
      </Route>
      <Route element={<Layout />}>
        <Route element={<AdminRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="reservations" element={<Reservations />} />
        </Route>
        <Route element={<GuestRoute />}></Route>
      </Route>
      <Route path="*" element={<Error />} />
    </Route>
  )
);

export default router;
