// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor  src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/app',
    icon: icon('ic_5'),
  },
  
  {
    title: 'Report',
    path: '/report',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Campaign',
    path: '/campaign',
    icon: icon('ic_4'),
  },
  {
    title: 'Store',
    path: '/store',
    icon: icon('ic_cart'),
  },
  {
    title: 'ProductCategory',
    path: '/productCategory',
    icon: icon('ic_2'),
  }, 
  {
    title: 'ProductItem',
    path: '/productitem',
    icon: icon('ic_3'),
  }, 
  {
    title: 'Voucher',
    path: '/voucher',
    icon: icon('ic_8'),
  },
  {
    title: 'Game',
    path: '/game',
    icon: icon('ic_disabled'),
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: icon('ic_user'),
  } ,
  {
    title: 'Logout',
    path: '/login',
    icon: icon('ic_lock'),
  } 
];

export default navConfig;
