import React, { useContext } from 'react';
import './MyReservations.scss';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TitlePagesSection from '../../shared/TitlePagesSection/TitlePagesSection';
import { getBookingsByUserId } from '../../core/services/Booking';
import ApartmentOverview from '../Reservation/components/ApartmentOverview';
import { Context } from '../../core/Context';
import gsap from 'gsap';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';

const MyReservations = () => {
   const [bookings, setBookings] = useState(null);
   const context = useContext(Context);

   const getBookingsByUser = async () => {
      await getBookingsByUserId(context.user.id).then(bookings => {
         setBookings(bookings);
      });
   };

   useEffect(() => {
      if (!context.user) return;

      getBookingsByUser();
   }, [context]);

   useEffect(() => {
      if (!bookings) return;

      const animationsContext = gsap.context(() => {
         gsap.to('.db-loading-page', { opacity: 0, display: 'none' });

         gsap.from('.db-apartment-overview', {
            opacity: 0,
            delay: 0.3,
            yPercent: 30,
            stagger: 0.1,
         });
      }, '.db-my-reservations-container');

      return () => {
         animationsContext.revert();
      };
   }, [bookings]);

   return (
      <>
         <div className="db-my-reservations-container">
            <LoadingScreen />
            <TitlePagesSection title={'Mis Reservas'} />
            <div className="db-my-reservations-bookings">
               {bookings &&
                  bookings.map(booking => {
                     return (
                        <ApartmentOverview
                           key={booking.id}
                           currentProduct={booking.product}
                           getCheckInDate={() => booking.initial_date}
                           getCheckOutDate={() => booking.final_date}
                           isBooking={false}
                           startTime={booking.startTime}
                        />
                     );
                  })}
               {bookings && !bookings.length ? (
                  <div>No se encontraron reservas para este usuario</div>
               ) : null}
            </div>
         </div>
      </>
   );
};

export default MyReservations;
