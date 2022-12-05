import React from 'react';
import ReservationCard from './components/ReservationCard';
import "./MyReservations.scss" 
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import TitlePagesSection from '../../shared/TitlePagesSection/TitlePagesSection';


const MyReservations = () => {


    const currentProduct= {
        category:{
            title:"hotel"
        },
        title:"hotel santa marta",
        location: "direccion falsa"
    }

    const reservation={
        id:"1",
        checkInDate: "20-12-2022",
        checkOutDate: "31-12-2022",
        arrivalDate: "20-12-2022"
    }

    const user={
        name: "Leandro",
        lastname:"Perez",
        email:"leandoperez@gmail.com"
    }

    //aca va la logica 
    return (
        
        <>
            {/* <LoadingScreen />  */}
            {/*div con el titulo */}
            {/*abre codicional dependiendo si tiene reservas  muestra bloque de reserva 
            sino mensaje no tiene reservas */}
            
            <div className='db-my-reservations-container'>
                <TitlePagesSection
                    title1={"Mi Perfil"}
                    title2={"Mis Reservas"}
                />
            <div className='db-reservation-card'>
            <ReservationCard 
                currentProduct={currentProduct}
                reservation={reservation}
                user={user}
                id={2}
            />
            </div>
            </div>
            {/* para opcion cdo no hay reservas
            <div className='db-my-reservations-container'>
            <HeaderReservation
                    category={currentProduct.category.title}
                    title={currentProduct.title}
                />
            <h2>No tienes reservas hechas aún</h2>            
            </div>
            
            */}
        </>
        
    );
}

export default MyReservations;
