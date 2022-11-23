import { useEffect } from 'react';
import { useState } from 'react';
import { Calendar } from 'react-multi-date-picker';
import useCalendarSize from '../../../../hooks/useCalendarSize';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { months, weekDays } from '../../../utils/spanishCalendar';
import Reservation from './Reservation';

const Availability = ({ disabledDates, currentDates, id }) => {
   const [isMobile, setIsMobile] = useState(null);
   const [calendarDates, setCalendarDates] = useState([]);

   const mapDaysF = ({ date }) => {
      if (!disabledDates) return;

      const isNotAvailable = disabledDates.some(dateRange => {
         const initialDate = new Date(dateRange.initialDate);
         initialDate.setMinutes(initialDate.getMinutes() + initialDate.getTimezoneOffset());
         const finalDate = new Date(dateRange.finalDate);
         finalDate.setMinutes(finalDate.getMinutes() + finalDate.getTimezoneOffset());
         finalDate.setDate(finalDate.getDate() + 1);
         return date.valueOf() >= initialDate && date.valueOf() < finalDate;
      });

      if (isNotAvailable) {
         return {
            disabled: true,
            style: { color: '#8798ad' },
            onClick: () => alert('weekends are disabled'),
         };
      }
   };

   useEffect(() => {
      if (!currentDates) {
         return;
      }

      setCalendarDates([currentDates[0], currentDates[1]]);
   }, [currentDates]);

   useCalendarSize(setIsMobile);

   return (
      <section className="db-apartment-availability">
         <SectionTitle>Fechas disponibles</SectionTitle>
         <div className="db-apartment-availability-container">
            <div className="db-apartment-availability-calendar">
               <Calendar
                  mapDays={mapDaysF}
                  numberOfMonths={isMobile ? 1 : 2}
                  weekDays={weekDays}
                  months={months}
                  minDate={new Date()}
                  range={true}
                  shadow={false}
                  value={calendarDates}
                  readOnly={true}
               />
            </div>
            <Reservation id={id} />
         </div>
      </section>
   );
};

export default Availability;
