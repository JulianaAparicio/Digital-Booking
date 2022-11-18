import '../Apartment/Apartment&Reservation.scss';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import { getProductById } from '../../core/services/Product';
import gsap from 'gsap';
import HeaderApartment from '../Apartment/Components/HeaderApartment';
import Card from '../../shared/Card/Card';
import Input from '../../shared/Input/Input';
import { getValidationErrors } from '../../utils/validationErrors';
import { Calendar } from 'react-multi-date-picker';
import { months, weekDays } from '../../utils/spanishCalendar';
import useCalendarSize from '../../../hooks/useCalendarSize';
import CheckIcon from '../../shared/Icons/CheckIcon';
import LocationIcon from './../../shared/Icons/LocationIcon';
import Button from '../../shared/Button/Button';
import Highlights from '../Apartment/Components/Highlights';

const dummyUser = {
   name: 'Pablo',
   lastName: 'Rios',
   email: 'pablo@gmail.com',
};

const ReservationPage = () => {
   const { apartmentId } = useParams();
   const [currentProduct, setCurrentProduct] = useState(null);
   const [isMobile, setIsMobile] = useState(null);

   const reservationForm = {
      name: { state: useState(), isValid: useState(false) },
      lastName: { state: useState(), isValid: useState(false) },
      email: { state: useState(), isValid: useState(false) },
      city: { state: useState(), isValid: useState(false) },
      dates: { state: useState() },
      checkIn: { state: useState(null) },
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

   useCalendarSize(setIsMobile);

   useEffect(() => {
      getProduct();
   }, []);

   useEffect(() => {
      if (!currentProduct) {
         return;
      }
      console.log(currentProduct);

      const loadingPageHide = gsap.to('.db-loading-page', {
         delay: 0.2,
         opacity: 0,
         display: 'none',
      });

      return () => {
         loadingPageHide.revert();
      };
   }, [currentProduct]);

   return (
      <>
         <LoadingScreen />
         {currentProduct && (
            <div className="db-reservation-page">
               <HeaderApartment
                  title={currentProduct.title}
                  category={currentProduct.category.title}
               />
               <div className="content">
                  <section className="db-form">
                     <h2>Completa tus datos</h2>
                     <Card>
                        <Input
                           value={dummyUser.name}
                           id={'name'}
                           placeholder={''}
                           type={'text'}
                           label={'Nombre'}
                           errors={getValidationErrors('text', false)}
                           setValue={reservationForm.name.state[1]}
                           name={'name'}
                           setInputValidation={reservationForm.name.isValid[1]}
                           isDisabled
                        />
                        <Input
                           value={dummyUser.lastName}
                           id={'lastName'}
                           placeholder={''}
                           type={'text'}
                           label={'Apellido'}
                           errors={getValidationErrors('text', false)}
                           setValue={reservationForm.lastName.state[1]}
                           name={'lastName'}
                           setInputValidation={reservationForm.lastName.isValid[1]}
                           isDisabled
                        />
                        <Input
                           value={dummyUser.email}
                           id={'email'}
                           placeholder={''}
                           type={'email'}
                           label={'Correo Electronico'}
                           errors={getValidationErrors('email', true)}
                           setValue={reservationForm.email.state[1]}
                           name={'email'}
                           setInputValidation={reservationForm.email.isValid[1]}
                           isDisabled
                        />
                        <Input
                           value={`${currentProduct.location.city.name}, ${currentProduct.location.city.state}`}
                           id={'city'}
                           placeholder={''}
                           type={'text'}
                           label={'Ciudad'}
                           errors={getValidationErrors('text', true)}
                           setValue={reservationForm.city.state[1]}
                           name={'city'}
                           setInputValidation={reservationForm.city.isValid[1]}
                           isDisabled
                        />
                     </Card>
                  </section>
                  <section className="db-reservation-date">
                     <h2>Selecciona tu fecha de reserva</h2>
                     <Card>
                        <Calendar
                           numberOfMonths={isMobile ? 1 : 2}
                           weekDays={weekDays}
                           months={months}
                           minDate={new Date()}
                           range={true}
                           shadow={false}
                           onChange={reservationForm.dates.state[1]}
                        />
                     </Card>
                  </section>
                  <section className="db-check-in">
                     <h2>Tu horario de llegada</h2>
                     <Card>
                        <div className="top">
                           <CheckIcon />
                           <p>
                              Tu habitación va a estar lista para el check-in entre las 10:00 AM y
                              las 11:00 PM
                           </p>
                        </div>
                        <div className="bottom">
                           <p>Indica tu horario estimado de llegada</p>
                           <Input
                              type="time-picker"
                              value={new Date()}
                              setValue={reservationForm.checkIn.state[1]}
                           />
                        </div>
                     </Card>
                  </section>
                  <section className="db-apartment-overview">
                     <Card>
                        <h2>Detalle de la reserva</h2>
                        <div className="top">
                           <img src={currentProduct.images.at(0)?.url ?? ''} alt="" />
                        </div>
                        <div>
                           <div className="details">
                              <p>{currentProduct.category.title}</p>
                              <h3>{currentProduct.title}</h3>
                              <div className="description">
                                 <LocationIcon />
                                 <p>
                                    {(l =>
                                       [l.address, l.city.name, l.city.state, l.city.country].join(
                                          ', '
                                       ))(currentProduct.location)}
                                 </p>
                              </div>
                           </div>
                           <div className="bottom">
                              <hr />
                              <div className="check-in">
                                 <p className="label">Check in</p>
                                 <p>{getCheckInDate() ?? 'Aun no seleccionado'}</p>
                              </div>
                              <hr />
                              <div className="check-out">
                                 <p className="label">Check out</p>
                                 <p>{getCheckOutDate() ?? 'Aun no seleccionado'}</p>
                              </div>
                              <hr />

                              <Button classList="db-button-primary">Confirmar reserva</Button>
                           </div>
                        </div>
                     </Card>
                  </section>
               </div>
               <Highlights highlights={currentProduct.items} />
            </div>
         )}
      </>
   );
};

export default ReservationPage;
