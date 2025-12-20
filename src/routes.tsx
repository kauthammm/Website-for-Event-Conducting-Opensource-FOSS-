import HomePage from './pages/hackathon/HomePage';
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
    name: 'Home',
    path: '/',
    element: <HomePage />
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
