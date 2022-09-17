import Home from '../pages/Home';
import { RoutesProps } from '../types';

const routes: RoutesProps[] = [
  {
    title: 'Home Page',
    exact: true,
    path: '/',
    component: Home,
  },
];

export default routes;
