import { useEffect } from 'react';
import { useState } from 'react';
import { Calendar } from 'react-multi-date-picker';
import useCalendarSize from '../../../../hooks/useCalendarSize';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { months, weekDays } from '../../../utils/spanishCalendar';
import Reservation from './Reservation';

const Availability = ({ disabledDays, currentDates, id }) => {
   const [isMobile, setIsMobile] = useState(null);
   const [calendarDates, setCalendarDates] = useState([]);

   const mapDaysF = ({ date }) => {
      if (disabledDays && disabledDays.includes(date.toString()))
         return {
            disabled: true,
            style: { color: '#ccc' },
            onClick: () => alert('weekends are disabled'),
         };
   };

   useEffect(() => {
      if (!currentDates) {
         return;
      }

      const dates = currentDates.split(',');
      setCalendarDates([dates[0], dates[1]]);
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
               />
            </div>
            <Reservation id={id} />
         </div>
      </section>
   );
};

export default Availability;
