import { poolPaths, wifiPaths } from './amenitiesPaths';
import './Amenity.scss';

const Amenity = ({ type, label = false }) => {
   // const paths = useRef(null);

   const paths = (() => {
      switch (type) {
         case 'wifi':
            return wifiPaths;
         case 'pool':
            return poolPaths;
         default:
            console.log(type);
            console.error('Amenity name not identified');
            return null;
      }
   })();

   return (
      <div className="db-svg-container">
         <svg
            width="18px"
            height="18px"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            {paths}
            <defs>
               <clipPath id="clip0_139_1022">
                  <rect width="18" height="18" fill="white" />
               </clipPath>
            </defs>
         </svg>
         {label && <span className="label">{label}</span>}
      </div>
   );
};

export default Amenity;
