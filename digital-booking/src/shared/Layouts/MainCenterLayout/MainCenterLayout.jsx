import gsap from 'gsap';
import { useEffect } from 'react';
import './MainCenterLayout.scss';

export default function MainCenterLayout({ children }) {
   useEffect(() => {
      const inputsAnimation = gsap.from('.db-main-center-layout > div > *', {
         duration: 0.5,
         yPercent: 100,
         opacity: 0,
         stagger: 0.08,
         ease: 'elastic.out(2, 1)',
      });

      return () => {
         inputsAnimation.revert();
      };
   }, []);

   return <div className="db-main-center-layout">{children}</div>;
}
