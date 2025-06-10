import { lazy } from 'react';

// Router
import { createBrowserRouter } from 'react-router';

// Components
import Loadable from '../components/loadable.component';
import AppLoader from '../components/app_loader.component';
import { AuthProvider } from './auth.provider';

// Layouts
const DashboardLayout = Loadable({ Component: lazy(() => import('../layouts/dashboard.layout')), FallBackLoader: <AppLoader /> });
const PublicLayout = Loadable({ Component: lazy(() => import('../layouts/public.layout')), FallBackLoader: <AppLoader /> });

// Pages
const Home = Loadable({ Component: lazy(() => import('../pages/home.page')), FallBackLoader: <AppLoader /> });
const SignIn = Loadable({ Component: lazy(() => import('../pages/signIn.page')), FallBackLoader: <AppLoader /> });
const SignUp = Loadable({ Component: lazy(() => import('../pages/signUp.page')), FallBackLoader: <AppLoader /> });

const router = createBrowserRouter([
  {
    path: '/',
    element:
      <AuthProvider>
        <DashboardLayout />
      </AuthProvider>,
    children: [
      {
        index: true,
        element: <Home />
      },
    ],
  },
  {
    path: '/auth',
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <SignIn />
      },
      {
        path: "signIn",
        element: <SignIn />
      },
      {
        path: "signUp",
        element: <SignUp />
      },
    ],
  },
]);

export default router;
