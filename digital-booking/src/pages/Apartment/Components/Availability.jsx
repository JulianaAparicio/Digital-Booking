import { useEffect } from 'react';
import { useState } from 'react';
import { Calendar } from 'react-multi-date-picker';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { months, weekDays } from '../../../utils/spanishCalendar';

const Availability = ({disabledDays}) => {
   const [isMobile, setIsMobile] = useState(null);

   const mapDaysF = ({date}) => {
      if (disabledDays && disabledDays.includes(date.toString())) return {
         disabled: true,
         style: { color: "#ccc" },
         onClick: () => alert("weekends are disabled")
      }
   }

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
         <Calendar
            mapDays={mapDaysF}
            numberOfMonths={isMobile ? 1 : 2}
            weekDays={weekDays}
            months={months}
            minDate={new Date()}
            range={true}
            shadow={false}
         />
      </section>
   );
};

export default Availability;
