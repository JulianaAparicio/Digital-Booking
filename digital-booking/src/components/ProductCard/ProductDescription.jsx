import LocationIcon from '../../shared/Icons/LocationIcon';
import Button from '../../shared/Button/Button';
import './ProductCard.scss';
import Amenity from '../../shared/Amenity/Amenity';
import { Link } from 'react-router-dom';
import Rating from '../../shared/Rating/Rating';
import { useContext } from 'react';
import { ProductMap } from '../../pages/Home/contexts/productMap';
import { useEffect } from 'react';

export default function ProductDescription({ product }) {
   const { id, category, title, rate, distance, amenities, description } = product;

   const { setProductMap } = useContext(ProductMap);

   return (
      <div className="db-product-description">
         <div className="db-product-header">
            <div className="db-product-title">
               <h4 className="db-product-category">
                  <span>{category.title}</span>
                  <Rating rate={rate && rate.score} />
               </h4>
               <h2>{title}</h2>
            </div>
            <div className="db-product-rate">
               <div className="db-product-points">{rate && rate.score * 2}</div>
               <span>{rate && rate.qualification}</span>
            </div>
         </div>
         <div className="db-product-location">
            <div className="db-product-location-map">
               <LocationIcon />
               <span>{distance}</span>
               <span
                  onClick={() => setProductMap(product)}
                  className="db-product-location-map--show">
                  Mostrar en el mapa
               </span>
            </div>
            <div className="db-product-location-amenities">
               {amenities.map(($amenity, i) => (
                  <Amenity key={i} type={$amenity.name} />
               ))}
            </div>
         </div>
         <div className="db-product-text">{description.slice(0, 70)}...</div>
         <Link to={`/product/${id}`}>
            <Button classList={'db-button-primary'}>Ver más</Button>
         </Link>
      </div>
   );
}
