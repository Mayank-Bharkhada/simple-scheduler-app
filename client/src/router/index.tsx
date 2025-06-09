import { lazy } from 'react';

// Router
import { createBrowserRouter } from 'react-router';

// Components
import Loadable from '../components/loadable.component';
import AppLoader from '../components/app_loader.component';

// Layouts
const DashboardLayout = Loadable({ Component: lazy(() => import('../layouts/dashboard.layout')), FallBackLoader: <AppLoader /> });
const PublicLayout = Loadable({ Component: lazy(() => import('../layouts/public.layout')), FallBackLoader: <AppLoader /> });

// Pages
const Home = Loadable({ Component: lazy(() => import('../pages/home.page')), FallBackLoader: <AppLoader /> });

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
    ],
  },
  {
    path: '/login',
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
    ],
  },
]);

export default router;
