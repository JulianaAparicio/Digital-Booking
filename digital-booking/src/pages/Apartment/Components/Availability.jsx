import { useEffect } from 'react';
import { useState } from 'react';
import { Calendar } from 'react-multi-date-picker';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { months, weekDays } from '../../../utils/spanishCalendar';
import Reservation from './Reservation';

const Availability = ({ disabledDays, currentDates }) => {
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

   useEffect(() => {
      const changeCalendar = () => {
         setIsMobile(window.matchMedia('(width < 600px)').matches ? true : false);
      };

      changeCalendar();

      window.addEventListener('resize', changeCalendar);

      return () => {
         window.removeEventListener('resize', changeCalendar);
      };
   }, []);

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

            <Reservation />
         </div>
      </section>
   );
};

export default Availability;
