// Importing packages
import { lazy } from 'react';

// Importing routes
const Home = lazy(() => import('../Pages/HomePage'));
const Movies = lazy(() => import('../Pages/MoviesPage'));
const Login = lazy(() => import('../Pages/LoginPage'));
const Register = lazy(() => import('../Pages/RegisterPage'));
const Favorites = lazy(() => import('../Pages/FavoritesPage'));

export const navigationRouts = [
{
name: 'Home',
path: '/',
component: <Home />
},
{
name: 'Movies',
path: '/movies',
component: <Movies   />
},
{
    name: 'Search',
    path: '/login',
    component: <Login />
},
{
    name: 'Search',
    path: '/register',
    component: <Register />
},
{
    name: 'Search',
    path: '/favourites',
    component: <Favorites  />
}
];

export default {
navigationRouts
};
//route.tsx
