import '../Apartment/Apartment&Reservation.scss';
import { useEffect } from 'react';
import { useState } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
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
import { getLocalStorage } from '../../core/services/Storage';
import { bookingProduct } from '../../core/services/Booking';
import { DateObject } from 'react-multi-date-picker';

const ReservationPage = () => {
   const ctx = useContext(Context);
   const { apartmentId } = useParams();
   const [currentProduct, setCurrentProduct] = useState(null);
   const [currentDates, setCurrentDates] = useState();
   const [isLoading, setIsLoading] = useState(false);
   const [isDisabled, setIsDisabled] = useState(true);


   const navigate = useNavigate();

   const reservationForm = {
      userId: {state: useState(null)},
      name: { state: useState(null), isValid: useState(false) },
      lastName: { state: useState(null), isValid: useState(false) },
      email: { state: useState(null), isValid: useState(false) },
      city: { state: useState(null), isValid: useState(false) },
      dates: { state: useState()},
      checkIn: { state: useState(new DateObject({hour: 10, minute: 0})) },
      productId: { state: useState(Number(apartmentId)) }
   };

   const booking = async () => {
      setIsLoading(true)
      await bookingProduct(reservationForm).then((status) => console.log(status)).finally(() => setIsLoading(false));
   }

   const getProduct = async () => {
      await getProductById(apartmentId).then(product => {
         setCurrentProduct(product[0]);
      });
   };

   const formatDate = unix => {
      return new Date(unix).toLocaleDateString('en-US');
   };

   const getCheckInDate = () => {
      const date = reservationForm.dates.state.at(0)?.at(0);
      return date ? formatDate(date) : null;
   };

   const getCheckOutDate = () => {
      const date = reservationForm.dates.state.at(0)?.at(1);
      return date ? formatDate(date) : null;
   };

   useEffect(() => {
      if (ctx.categories.length > 0 && !ctx.user) {
         navigate('/login');
         window.alert('Necesitas iniciar sesión antes de reservar.');
      }
   }, [ctx]);

   useEffect(() => {
      if(reservationForm) {
         setIsDisabled(!(reservationForm.userId.state[0] !== null && reservationForm.productId.state[0] !== null && reservationForm.checkIn.state[0] !== null && reservationForm.dates.state[0] && reservationForm.dates.state[0].length === 2))
      }
   }, [reservationForm])

   useEffect(() => {
      getProduct();
      setCurrentDates(getLocalStorage('CURRENT_DATES'));
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
                     <ReservationDate reservationForm={reservationForm} currentDates={currentDates} disabledDates={currentProduct.availability} />
                     <ReservationCheckIn reservationForm={reservationForm} />
                     <ApartmentOverview
                        currentProduct={currentProduct}
                        getCheckInDate={getCheckInDate}
                        getCheckOutDate={getCheckOutDate}
                        confirm={booking}
                        isLoading={isLoading}
                        isDisabled={isDisabled}
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
