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
const Modules = lazy(() => import('@/pages/Admin/Modules/Modules'));
const ViewModules = lazy(() => import('@/components/Admin/Modules/View'));
const Scanner = lazy(() => import('@/pages/Scanner/Scanner'));
const Guests = lazy(() => import('@/pages/Admin/Guests/Guests'));
const Accounts = lazy(() => import('@/pages/Accounts/Accounts'));
const Profile = lazy(() => import('@/pages/Guest/Profile/Profile'));
const Room = lazy(() => import('@/pages/Guest/Room/Rooms'));
const Reservation = lazy(() => import('@/pages/Guest/Reservation/Reservation'));
const Reports = lazy(() => import('@/pages/Admin/Reports/Reports'));

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
          <Route path="modules" element={<Modules />} />
          <Route path="modules/view/:id" element={<ViewModules />} />
          <Route path="scan" element={<Scanner />} />
          <Route path="guests" element={<Guests />} />
          <Route path="accounts" element={<Accounts />} />
          <Route path="reports" element={<Reports />} />
        </Route>
        <Route element={<GuestRoute />}>
          <Route path="profile" element={<Profile />} />
          <Route path="room" element={<Room />} />
          <Route path="reservation" element={<Reservation />} />
        </Route>
      </Route>
      <Route path="*" element={<Error />} />
    </Route>
  )
);

export default router;
