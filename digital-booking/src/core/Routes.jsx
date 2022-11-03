import { createBrowserRouter } from "react-router-dom";
import Apartment from "../pages/Apartment/Apartment";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

const router = createBrowserRouter([
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
      path: '/:apartmentId',
      element: <Apartment />,
   },
]);

export { router };