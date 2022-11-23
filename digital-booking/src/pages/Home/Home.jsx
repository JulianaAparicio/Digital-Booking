import { useEffect, useState, useContext } from 'react';
import './Home.scss';
import Categories from './components/Categories/Categories';
import Recomendations from './components/Recomendations/Recomendations';
import Searcher from './components/Searcher/Searcher';
import gsap from 'gsap';
import { Context } from '../../core/Context';
import {
   getAllProducts,
   getProductByCategory,
   getProductByQuery,
} from '../../core/services/Product';
import { useRef } from 'react';
import LoadingComponent from './components/LoadingComponent/LoadingComponent';

const Home = () => {
   const appContext = useContext(Context);

   const categoriesAnimated = useRef(false);
   const recomendationsAnimated = useRef(false);

   const [currentProducts, setCurrentProducts] = useState(null);
   const [isLoading, setIsLoading] = useState(false);

   const searchForm = {
      city: { state: useState(null), isValid: useState(false) },
      date: { state: useState(null), isValid: useState(false) },
   };

   const search = async () => {
      setIsLoading(true);
      setCurrentProducts([]);
      await getProductByQuery(searchForm).then(products => {
         setCurrentProducts(products);
         setIsLoading(false);
      });
   };

   const searchByCategory = async category => {
      setIsLoading(true);
      setCurrentProducts([]);
      await getProductByCategory(category).then(products => {
         setCurrentProducts(products);
         setIsLoading(false);
      });
   };

   useEffect(() => {
      if (!appContext.categories.length || categoriesAnimated.current) {
         return;
      }

      const loadingCategories = gsap.to('.db-categories-container .db-loading-component', {
         delay: 0.2,
         opacity: 0,
         display: 'none',
      });

      const categoriesAnimations = gsap.from('#home .db-categories .cards > div', {
         duration: 0.5,
         opacity: 0,
         yPercent: 20,
         stagger: 0.1,
         ease: 'power2.out',
      });

      categoriesAnimated.current = true;

      return () => {
         categoriesAnimated.current = false;
         categoriesAnimations.revert();
         loadingCategories.revert();
      };
   }, [appContext]);

   useEffect(() => {
      if (!currentProducts || recomendationsAnimated.current) {
         return;
      }

      gsap.to('.db-recommendations-container .db-loading-component', {
         delay: 0.2,
         opacity: 0,
         display: 'none',
      });

      gsap.from('#home .db-recommendations .cards .db-card', {
         duration: 0.5,
         opacity: 0,
         scale: 0.6,
         stagger: 0.2,
         ease: 'power2.out',
      });

      recomendationsAnimated.current = true;
   }, [currentProducts]);

   useEffect(() => {
      if (searchForm.city.state[0] === null && searchForm.date.state[0] === null) {
         getProducts().then(products => {
            setCurrentProducts(products);
            setIsLoading(false);
         });
      }
   }, [searchForm.city.state[0], searchForm.date.state[0]]);

   return (
      <>
         {isLoading ? <LoadingComponent /> : null}

         <div id="home">
            <Searcher
               setDate={searchForm.date.state[1]}
               setPlace={searchForm.city.state[1]}
               setPlaceValidation={searchForm.city.isValid[1]}
               setDateValidation={searchForm.date.isValid[1]}
               typeHeadOptions={appContext.cities}
               search={search}
               isLoading={isLoading}
            />
            <div className="db-component-container db-categories-container">
               <LoadingComponent />
               {
                  <Categories
                     categories={appContext.categories
                        .filter(category => {
                           try {
                              new URL(category.imageURL);
                              return true;
                           } catch (error) {
                              return false;
                           }
                        })
                        .slice(0, 4)}
                     searchByCategory={searchByCategory}
                  />
               }
            </div>
            <div className="db-component-container db-recommendations-container">
               <LoadingComponent />
               {currentProducts ? <Recomendations products={currentProducts} /> : null}
            </div>
         </div>
      </>
   );
};

async function getProducts() {
   return await getAllProducts();
}

export default Home;
