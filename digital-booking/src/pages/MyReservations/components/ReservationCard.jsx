import React from 'react';
import Button from '../../../shared/Button/Button';
import Card from '../../../shared/Card/Card';
import { Link } from 'react-router-dom';

const ReservationCard = ({currentProduct, reservation, user, id}) => {

            return (
            <section className="db-my-reservations-card">
                <Card>
                    <h2>Detalles del Alojamiento</h2>
                    <div>
                        <div className="hotel-details">
                            <p>{currentProduct.category.title}</p>
                            <h3>{currentProduct.title}</h3>
                            <div className="description">
                                <p>
                                    Dirección: {currentProduct.location}
                                </p>
                            </div>
                            <Link to={`/product/${id}`}>
                            <Button classList="db-button-primary" >
                                Ir al Alojamiento
                            </Button>
                            </Link>
                            <hr className="booking-card-spacer" />
                        </div>
                        <div className="reservation-details">
                        <h2>Detalles de la Reserva</h2>
                            <div className="check-in">
                                <p className="label">Check in</p>
                                <p>{reservation.checkInDate}</p>
                            </div>
                            <div className="check-out">
                                <p className="label">Check out</p>
                                <p>{reservation.checkOutDate}</p>
                            </div>
                            <hr className="booking-card-spacer" />
                        </div>
                        <div className='user-details'>
                        <h2>Datos del Usuario</h2>
                            <div className='user-name'>
                                <p>Nombre: {user.name}</p>
                            </div>
                            <div className='user-lastname'>
                                <p>Apellido: {user.lastname}</p>
                            </div>
                            <div className='user-email'>
                                <p>Correo electrónico: {user.email} </p>
                            </div>
                        </div>
                    </div>
                </Card>
            </section>
            );
}

export default ReservationCard;
