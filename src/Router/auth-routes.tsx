// Importing packages
import { lazy } from 'react';

// Importing routes
const Home = lazy(() => import('../Pages/HomePage'));
const Movies = lazy(() => import('../Pages/MoviesPage'));
// const Search = lazy(() => import('../Pages/Search'));
// const Cart = lazy(() => import('../Pages/CartPage'));

export const navigationRouts = [
{
name: 'Home',
path: '/',
component: <Home />
},
{
name: 'Movies',
path: '/movies',
component: <Movies />
},
// {
//     name: 'Search',
//     path: '/search',
//     component: <Search />
// },
// {
//     name: 'Search',
//     path: '/cart',
//     component: <Cart />
// }
];

export default {
navigationRouts
};
//route.tsx
