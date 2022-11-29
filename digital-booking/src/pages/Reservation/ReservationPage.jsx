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
import { getLocalStorage } from '../../core/services/Storage';
import { bookingProduct } from '../../core/services/Booking';
import { DateObject } from 'react-multi-date-picker';
import Thanks from './components/Thanks';
import { createRef } from 'react';

const ReservationPage = () => {
   const ctx = useContext(Context);
   const { apartmentId } = useParams();
   const [currentProduct, setCurrentProduct] = useState(null);
   const [currentDates, setCurrentDates] = useState();
   const [isLoading, setIsLoading] = useState(null);
   const [isDisabled, setIsDisabled] = useState(true);

   const thanksContainer = createRef();

   const navigate = useNavigate();

   const reservationForm = {
      userId: { state: useState(null) },
      name: { state: useState(null), isValid: useState(false) },
      lastName: { state: useState(null), isValid: useState(false) },
      email: { state: useState(null), isValid: useState(false) },
      city: { state: useState(null), isValid: useState(false) },
      vacined: { state: useState('Si'), isValid: useState(false) },
      tips: { state: useState(''), isValid: useState(true)},
      dates: { state: useState() },
      checkIn: { state: useState(new DateObject({ hour: 10, minute: 0 })) },
      productId: { state: useState(Number(apartmentId)) },
   };

   const booking = async () => {
      setIsLoading(true);
      await bookingProduct(reservationForm)
         .then(status => console.log(status))
         .finally(() => {
            setIsLoading(false);
         });
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
      const date = reservationForm.dates.state.at(0)?.at(0);
      return date ? formatDate(date) : null;
   };

   const getCheckOutDate = () => {
      const date = reservationForm.dates.state.at(0)?.at(1);
      return date ? formatDate(date) : null;
   };

   useEffect(() => {
      if (isLoading) {
         currentProduct &&
            gsap.to('.db-loading-page', {
               opacity: 1,
               display: 'flex',
            });
      } else {
         gsap.to('.db-loading-page', {
            delay: 0.2,
            opacity: 0,
            display: 'none',
         });
         if (isLoading !== null) {
            thanksContainer.current.style.display = 'flex';
            gsap.from('.db-thanks-container .db-card', {
               delay: 0.2,
               scale: 0,
               ease: 'elastic.out(1, 1)',
            });
         }
      }
   }, [isLoading]);

   useEffect(() => {
      if (ctx.categories.length > 0 && !ctx.user) {
         navigate('/login', {
            state: { reservationMessage: 'Para realizar una reserva necesitas estar logueado' },
         });
      }
   }, [ctx]);

   useEffect(() => {
      if (reservationForm) {
         setIsDisabled(
            !(
               reservationForm.userId.state[0] !== null &&
               reservationForm.productId.state[0] !== null &&
               reservationForm.checkIn.state[0] !== null &&
               reservationForm.dates.state[0] &&
               reservationForm.dates.state[0].length === 2
            )
         );
      }
   }, [reservationForm]);

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
         loadingPageHide.revert();
         cardsAnimation.revert();
      };
   }, [currentProduct]);

   return (
      ctx.user && (
         <>
            <Thanks productId={apartmentId} ref={thanksContainer} />
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
                     <ReservationDate
                        reservationForm={reservationForm}
                        currentDates={currentDates}
                        disabledDates={currentProduct.availability}
                     />
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
