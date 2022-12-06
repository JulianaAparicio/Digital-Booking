import { useEffect, useState } from 'react';
import { Calendar } from 'react-multi-date-picker';
import useCalendarSize from '../../../../hooks/useCalendarSize';
import Card from '../../../shared/Card/Card';
import { months, weekDays } from '../../../utils/spanishCalendar';

const ReservationDate = ({ reservationForm, currentDates, disabledDates }) => {
   const [isMobile, setIsMobile] = useState(null);
   const [calendarDates, setCalendarDates] = useState([]);
   const [currentDatesDisabled, setCurrentDatesDisabled] = useState(false);

   useCalendarSize(setIsMobile);

   const mapDaysF = ({ date }) => {
      if (!disabledDates) return;

      const isNotAvailable = disabledDates.some(dateRange => {
         const initialDate = new Date(dateRange.initial_date);
         initialDate.setMinutes(initialDate.getMinutes() + initialDate.getTimezoneOffset());
         const finalDate = new Date(dateRange.final_date);
         finalDate.setMinutes(finalDate.getMinutes() + finalDate.getTimezoneOffset());
         finalDate.setDate(finalDate.getDate() + 1);
         return typeof date === 'object'
            ? date.valueOf() >= initialDate && date.valueOf() < finalDate
            : date >= initialDate && date < finalDate;
      });

      if (isNotAvailable) {
         return {
            disabled: true,
            style: { color: '#8798ad' },
         };
      }
   };

   useEffect(() => {
      if (!currentDates) {
         return;
      }

      const currentInitialDateisDisabled = mapDaysF({ date: currentDates[0] });
      const currentFinalDateisDisabled = mapDaysF({ date: currentDates[1] });
      if (
         !(
            (currentFinalDateisDisabled && currentFinalDateisDisabled.disabled) ||
            (currentInitialDateisDisabled && currentInitialDateisDisabled.disabled)
         )
      ) {
         setCalendarDates([currentDates[0], currentDates[1]]);
         reservationForm.dates.state[1]([currentDates[0], currentDates[1]]);
         setCurrentDatesDisabled(false);
      } else {
         setCurrentDatesDisabled(true);
      }
   }, [currentDates]);

   return (
      <section className="db-reservation-date">
         <h2>Selecciona tu fecha de reserva</h2>
         <Card>
            {currentDatesDisabled ? (
               <div className="top">
                  <p>
                     Las fechas de tú busqueda más reciente no estan disponibles para este producto
                  </p>
               </div>
            ) : null}
            <Calendar
               mapDays={mapDaysF}
               numberOfMonths={isMobile ? 1 : 2}
               weekDays={weekDays}
               months={months}
               minDate={new Date()}
               range={true}
               shadow={false}
               onChange={reservationForm.dates.state[1]}
               value={calendarDates}
            />
         </Card>
      </section>
   );
};

export default ReservationDate;
