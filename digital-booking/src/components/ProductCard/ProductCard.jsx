import { useEffect } from 'react';
import Card from '../../shared/Card/Card';
import SideMainLayout from '../../shared/Layouts/SideMainLayout/SideMainLayout';
import ProductDescription from './ProductDescription';
import ProductImage from './ProductImage';

export default function ProductCard({ product, toggleFavorite }) {
   

   useEffect(() => {}, [product]);
   return (
      <Card classList={'db-card-product'}>
         <SideMainLayout
            side={
               <ProductImage
                  id={product.id}
                  addFavorite={toggleFavorite}
                  isFavorite={product.isFavorite}
                  url={product.images.length ? product.images[0].url : ''}
                  productName={product.images.length ? product.images[0].title : ''}
               />
            }
            main={<ProductDescription product={product} />}
         />
      </Card>
   );
}
