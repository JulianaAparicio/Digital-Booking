import { useState } from 'react';
import StartFilledIcon from '../Icons/StarFilledIcon';
import './Rating.scss';

export default function Rating({ rate }) {
   const [rating, setRating] = useState(new Array(rate).fill(1));

   return (
      <div className="db-rating">
         {rating.map((el, i) => (
            <StartFilledIcon key={i} />
         ))}
      </div>
   );
}
