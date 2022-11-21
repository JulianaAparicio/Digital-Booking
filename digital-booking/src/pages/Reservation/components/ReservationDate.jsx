import { useEffect, useState } from 'react';
import { Calendar } from 'react-multi-date-picker';
import useCalendarSize from '../../../../hooks/useCalendarSize';
import Card from '../../../shared/Card/Card';
import { months, weekDays } from '../../../utils/spanishCalendar';

const ReservationDate = ({ reservationForm }) => {
   const [isMobile, setIsMobile] = useState(null);

   useCalendarSize(setIsMobile);

   return (
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
   );
};

export default ReservationDate;
