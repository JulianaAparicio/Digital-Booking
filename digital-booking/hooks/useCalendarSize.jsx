import { useEffect } from 'react';

const useCalendarSize = setter => {
   useEffect(() => {
      const changeCalendar = () => {
         setter(window.matchMedia('(width < 600px)').matches ? true : false);
      };

      changeCalendar();

      window.addEventListener('resize', changeCalendar);

      return () => {
         window.removeEventListener('resize', changeCalendar);
      };
   }, []);
};

export default useCalendarSize;
