import React from 'react';
import "./MyReservations.scss"
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TitlePagesSection from '../../shared/TitlePagesSection/TitlePagesSection';
import { getBookingsByUserId } from '../../core/services/Booking';
import ApartmentOverview from '../Reservation/components/ApartmentOverview';


const MyReservations = () => {
    const { userId } = useParams();
    const [bookings, setBookings] = useState([]);

    const getBookingsByUser = async () => {
        await getBookingsByUserId(userId).then((bookings) => {
            setBookings(bookings)
        });
    }

    useEffect(() => {
        getBookingsByUser();
    }, [userId])

    return (
        <>
            <div className='db-my-reservations-container'>
                <TitlePagesSection
                    title={"Mis Reservas"}
                />
                <div className='db-my-reservations-bookings'>
                    {
                        bookings.map((booking) => {
                            return <ApartmentOverview
                                key={booking.id}
                                currentProduct={booking.product}
                                getCheckInDate={() => booking.initial_date}
                                getCheckOutDate={() => booking.final_date}
                                isBooking={false}
                                startTime={booking.startTime}
                            />
                        })
                    }
                    {
                        !bookings.length ? <div>No se encontraron reservas para este usuario</div> : null
                    }
                </div>
            </div>
        </>

    );
}

export default MyReservations;
