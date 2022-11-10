import LocationIcon from '../../../shared/Icons/locationIcon';
import Rating from '../../../shared/Rating/Rating';

export default function Location({ location, rate }) {
   return (
      <div className="db-apartment-location">
         <div className='db-apartment-location-info'>
            <LocationIcon />
            <span>{`${location.city.name} - ${location.city.state}, ${location.city.country}`}</span>
         </div>
         <div className='db-apartment-rate'>
            <div className="db-apartment-rating">
               <div>{rate.qualification}</div>
               <div>
                  <Rating rate={rate.score} />
               </div>
            </div>
            <div className='db-apartment-points'>
               {rate.score * 2}
            </div>
         </div>
      </div>
   );
}
