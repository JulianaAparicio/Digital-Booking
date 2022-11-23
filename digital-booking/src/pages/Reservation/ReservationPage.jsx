import '../Apartment/Apartment&Reservation.scss';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import { getProductById } from '../../core/services/Product';
import gsap from 'gsap';
import HeaderApartment from '../Apartment/Components/HeaderApartment';
import Highlights from '../Apartment/Components/Highlights';
import ReservationForm from './components/ReservationForm';
import ReservationDate from './components/ReservationDate';
import ReservationCheckIn from './components/ReservationCheckIn';
import ApartmentOverview from './components/ApartmentOverview';
import { useContext } from 'react';
import { Context } from '../../core/Context';

const ReservationPage = () => {
   const ctx = useContext(Context);
   const { apartmentId } = useParams();
   const [currentProduct, setCurrentProduct] = useState(null);

   const navigate = useNavigate();

   const reservationForm = {
      name: { state: useState(), isValid: useState(false) },
      lastName: { state: useState(), isValid: useState(false) },
      email: { state: useState(), isValid: useState(false) },
      city: { state: useState(), isValid: useState(false) },
      dates: { state: useState() },
      checkIn: { state: useState(new Date()) },
   };

   const getProduct = async () => {
      await getProductById(apartmentId).then(product => {
         setCurrentProduct(product[0]);
      });
   };

   const formatDate = unix => {
      return new Date(unix).toLocaleDateString('en-US');
   };

   const getCheckInDate = () => {
      const date = reservationForm.dates.state.at(0)?.at(0)?.unix * 1000;
      return date ? formatDate(date) : null;
   };

   const getCheckOutDate = () => {
      const date = reservationForm.dates.state.at(0)?.at(1)?.unix * 1000;
      return date ? formatDate(date) : null;
   };

   useEffect(() => {
      if (ctx.categories.length > 0 && !ctx.user) {
         navigate('/login');
         window.alert('Necesitas iniciar sesión antes de reservar.');
      }
   }, [ctx]);

   useEffect(() => {
      getProduct();
   }, []);

   useEffect(() => {
      if (!currentProduct) {
         return;
      }

      const loadingPageHide = gsap.to('.db-loading-page', {
         delay: 0.2,
         opacity: 0,
         display: 'none',
      });

      const cardsAnimation = gsap.from('.db-reservation-page .db-card', {
         delay: 0.2,
         opacity: 0,
         y: 100,
         stagger: 0.1,
      });

      return () => {
         cardsAnimation.revert();
         loadingPageHide.revert();
      };
   }, [currentProduct]);

   return (
      ctx.user && (
         <>
            <LoadingScreen />
            {currentProduct && (
               <div className="db-reservation-page">
                  <HeaderApartment
                     title={currentProduct.title}
                     category={currentProduct.category.title}
                  />
                  <div className="content">
                     <ReservationForm
                        currentProduct={currentProduct}
                        reservationForm={reservationForm}
                        user={ctx.user}
                     />
                     <ReservationDate reservationForm={reservationForm} />
                     <ReservationCheckIn reservationForm={reservationForm} />
                     <ApartmentOverview
                        currentProduct={currentProduct}
                        getCheckInDate={getCheckInDate}
                        getCheckOutDate={getCheckOutDate}
                     />
                  </div>
                  <Highlights highlights={currentProduct.items} />
               </div>
            )}
         </>
      )
   );
};

export default ReservationPage;
