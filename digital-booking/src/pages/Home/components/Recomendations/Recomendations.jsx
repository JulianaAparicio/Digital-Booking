import { useEffect } from 'react';
import { useState } from 'react';
import ProductCard from '../../../../components/ProductCard/ProductCard';
import { toggleFavoriteLocal } from '../../../../core/services/Favorite';
import { mapProducts } from '../../../../core/services/Product';

const Recomendations = ({ products }) => {
   const [currentProducts, setCurrentProducts] = useState([]);

   const toggleFavorite = async id => {
      await toggleFavoriteLocal(id);
      setCurrentProducts(mapProducts(products));
   };

   useEffect(() => {
      setCurrentProducts(products);
   }, [products]);

   return (
      <section className="db-recommendations">
         <h2>Recomendaciones</h2>
         <article className="cards">
            {currentProducts.map(($product, i) => (
               <ProductCard
                  key={$product.id || i}
                  product={$product}
                  toggleFavorite={toggleFavorite}
               />
            ))}
         </article>
      </section>
   );
};

export default Recomendations;
