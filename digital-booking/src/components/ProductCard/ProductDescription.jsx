import LocationIcon from '../../shared/Icons/LocationIcon';
import Button from '../../shared/Button/Button';
import './ProductCard.scss';
import Amenity from '../../shared/Amenity/Amenity';
import { Link } from 'react-router-dom';
import Rating from '../../shared/Rating/Rating';

export default function ProductDescription({
   id,
   category,
   title,
   points,
   textRate,
   distance,
   amenities,
   description,
}) {
   return (
      <div className="db-product-description">
         <div className="db-product-header">
            <div className="db-product-title">
               <h4 className="db-product-category"><span>{category.title}</span><Rating rate={4}/></h4>
               <h1>{title}</h1>
            </div>
            <div className="db-product-rate">
               <div className="db-product-points">{points}</div>
               <span>{textRate}</span>
            </div>
         </div>
         <div className="db-product-location">
            <div className="db-product-location-map">
               <LocationIcon />
               <span>{distance}</span>
               <span className="db-product-location-map--show">Mostrar en el mapa</span>
            </div>
            <div className="db-product-location-amenities">
               {amenities.map(($amenity, i) => (
                  <Amenity key={i} type={$amenity.name} />
               ))}
            </div>
         </div>
         <div className="db-product-text">{description.slice(0,100)}...</div>
         <Link to={`product/${id}`} >
            <Button classList={'db-button-primary'}>Ver más</Button>
         </Link>
      </div>
   );
}
