import { createBrowserRouter, Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Apartment from '../pages/Apartment/Apartment';
import CreateProduct from '../pages/Create/CreateProduct';
import FavoritePage from '../pages/FavoritePage/FavoritePage';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import MyReservations from '../pages/MyReservations/MyReservations';
import Register from '../pages/Register/Register';
import ReservationPage from '../pages/Reservation/ReservationPage';

const MainLayout = () => {
   return (
      <>
         <Header />
         <main>
            <Outlet />
         </main>
         <Footer>©2022 Digital Booking</Footer>
      </>
   );
};

const router = createBrowserRouter(
   [
      {
         element: <MainLayout />,
         children: [
            {
               path: '/',
               element: <Home />,
            },
            {
               path: '/login',
               element: <Login />,
            },
            {
               path: '/register',
               element: <Register />,
            },
            {
               path: '/product',
               children: [
                  {
                     path: ':apartmentId',
                     element: <Apartment />,
                  },
               ],
            },
            {
               path: '/booking',
               children: [
                  {
                     path: ':apartmentId',
                     element: <ReservationPage />,
                  },
                  {
                     path: 'user',
                     children: [{
                        path: ':userId',
                        element: <MyReservations />,
                     }]
                  }
               ],
            },
            {
               path: '/administration',
               children: [
                  {
                     path: 'products',
                     element: <CreateProduct />,
                  },
                  {
                     path: 'users',
                     element: <Register />,
                  },
               ],
            },
            {
               path: '/favorites',
               children: [{
                  path: ':userId',
                  element: <FavoritePage />,
               }]
            },
         ],
      },
   ],
   { basename: '/' }
);

export { router };
