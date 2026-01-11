import HomePage from './pages/hackathon/HomePage';
import LoginPage from './pages/auth/LoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import ParticipantDashboard from './pages/participant/ParticipantDashboard';
import MissionsPage from './pages/participant/MissionsPage';
import EventPage from './pages/hackathon/EventPage';
import RegisterPage from './pages/hackathon/RegisterPage';
import PrizesPage from './pages/hackathon/PrizesPage';
import ContactPage from './pages/hackathon/ContactPage';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Login',
    path: '/',
    element: <LoginPage />,
    visible: true,
  },
  {
    name: 'Commander',
    path: '/admin',
    element: <AdminDashboard />,
    visible: false,
  },
  {
    name: 'Soldier',
    path: '/participant',
    element: <ParticipantDashboard />,
    visible: false,
  },
  {
    name: 'Missions',
    path: '/missions',
    element: <MissionsPage />,
    visible: false,
  },
  {
    name: 'Home',
    path: '/home',
    element: <HomePage />,
    visible: true,
  },
  {
    name: 'Event Info',
    path: '/event',
    element: <EventPage />
  },
  {
    name: 'Register',
    path: '/register',
    element: <RegisterPage />
  },
  {
    name: 'Prizes',
    path: '/prizes',
    element: <PrizesPage />
  },
  {
    name: 'Contact',
    path: '/contact',
    element: <ContactPage />
  }
];

export default routes;
