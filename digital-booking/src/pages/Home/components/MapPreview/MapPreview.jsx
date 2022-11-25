import { useContext } from 'react';
import Card from '../../../../shared/Card/Card';
import { ProductMap } from '../../contexts/productMap';
import './MapPreview.scss';
import Button from '../../../../shared/Button/Button';
import { useEffect } from 'react';
import gsap from 'gsap';

const MapPreview = () => {
   const { productMap: product, setProductMap } = useContext(ProductMap);

   useEffect(() => {
      if (product) {
         gsap.fromTo(
            '.db-map-preview-container .db-card',
            { scale: 0 },
            { scale: 1, ease: 'elastic.out(1, 1)' }
         );
      }
   }, [product]);

   return (
      <>
         {product && (
            <div className="db-map-preview-container">
               <Card>
                  <iframe
                     className="db-product-map"
                     frameBorder="0"
                     referrerPolicy="no-referrer-when-downgrade"
                     src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAAWqIsm_JZtUYIW0OowHuGiMZIEJRX8F4&q=${`${product.title},${product.location.city.name},${product.location.city.country},${product.location.city.country}`.replaceAll(
                        ' ',
                        '%20'
                     )}`}
                  />
                  <Button action={() => setProductMap(false)} classList="db-button-primary">
                     Cerrar
                  </Button>
               </Card>
            </div>
         )}
      </>
   );
};

export default MapPreview;
