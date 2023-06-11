import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//

import Profile from './pages/Profile';
import Logout from './pages/Logout';
import Login from './pages/Login';
import RegisterPage from './pages/RegisterPage';
import Page404 from './pages/Page404';
import ProductCategory from './pages/productcategory/productcategory';
import ProductItem from './pages/productitem/productitem';
import DashboardAppPage from './pages/DashboardAppPage';
import Game from './pages/games/Games';
import Voucher from './pages/vouchers/Voucher';
import Campaign from './pages/campaigns/campaign';
import Service from './services/header.service';
import PageRole from './pages/PageRole';
import Store from './pages/store/Stores';
import Report from './pages/report/report';


// ----------------------------------------------------------------------

export default function Router() {
  
  const routes = useRoutes([
    {
      path: '',
      element:  <DashboardLayout /> ,
      children: [
        { element: <Navigate to="app" />, index: true },
        { path: 'app', element:  <DashboardAppPage /> },
        { path: 'game', element:  <Game />  },
        { path: 'voucher', element:  <Voucher /> },
        { path: 'campaign', element:  <Campaign /> },
        { path: 'productcategory', element:  <ProductCategory /> },
        { path: 'productitem', element:  <ProductItem /> },
        { path: 'store', element:  <Store /> },
        { path: 'report', element:  <Report /> },
        { path: 'logout', element:  <Logout /> },
        { path: 'profile', element:  <Profile />},
      ],
    },
    {
      path: 'login',
      element: <Login />,
    },    
    
    {
      path: 'register',
      element: <RegisterPage />,
    },
    
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
