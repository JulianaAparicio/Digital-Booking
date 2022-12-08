import gsap from 'gsap';
import { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import { Context } from '../../core/Context';
import { getFavoritesByUser } from '../../core/services/Favorite';
import TitlePagesSection from '../../shared/TitlePagesSection/TitlePagesSection';
import Recomendations from '../Home/components/Recomendations/Recomendations';
import { ProductMap } from '../Home/contexts/productMap';

export default function FavoritePage() {
   const context = useContext(Context);

   const [productMap, setProductMap] = useState(null);
   const [favorites, setFavorites] = useState(null);

   useEffect(() => {
      if (!context.user) return;

      getFavoritesByUser(context.user.id).then(userFavorites => {
         console.log(userFavorites);
         setFavorites(userFavorites);
      });
   }, [context]);

   useEffect(() => {
      if (!favorites) return;
      console.log('pasao');

      const animationsContext = gsap.context(() => {
         gsap.to('.db-loading-page', { opacity: 0, display: 'none' });

         gsap.from('.db-card-product', { opacity: 0, delay: 0.4, yPercent: 30, stagger: 0.1 });
      }, '.db-favourites-container');

      return () => {
         animationsContext.revert();
      };
   }, [favorites]);

   return (
      <ProductMap.Provider value={{ productMap, setProductMap }}>
         <TitlePagesSection title={'Mis Favoritos'} />

         <div className="db-favourites-container">
            <LoadingScreen />
            {favorites && favorites.length ? (
               <Recomendations products={favorites} title={'Favoritos'} />
            ) : (
               <div style={{ margin: '2rem' }}>No se encontraron resultados</div>
            )}
         </div>
      </ProductMap.Provider>
   );
}
