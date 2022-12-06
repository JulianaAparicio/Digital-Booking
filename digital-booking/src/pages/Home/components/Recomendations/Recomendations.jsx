import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import ProductCard from '../../../../components/ProductCard/ProductCard';
import { toggleFavoriteLocal } from '../../../../core/services/Favorite';
import { mapProducts } from '../../../../core/services/Product';
import { Context } from '../../../../core/Context';


export default function Recomendations ({ title, products }) {
   const { user } = useContext(Context);
   const [currentProducts, setCurrentProducts] = useState([]);

   const toggleFavorite = async (id) => {
      await toggleFavoriteLocal(id, user).then(() => {
         setCurrentProducts(mapProducts(products));
      });
   };

   useEffect(() => {
      setCurrentProducts(products);
   }, [products]);

   return (
      <section className="db-recommendations">
         <h2>{title}</h2>
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

