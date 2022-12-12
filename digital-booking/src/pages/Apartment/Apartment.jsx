import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import './Apartment&Reservation.scss';
import Amenities from './Components/Amenities';
import Description from './Components/Description';
import Availability from './Components/Availability';
import Highlights from './Components/Highlights';
import Images from './Components/Images';
import gsap from 'gsap';
import { getProductById } from '../../core/services/Product';
import HeaderApartment from './Components/HeaderApartment';
import Location from './Components/Location';
import ShareIcon from '../../shared/Icons/ShareIcon';
import HeartIcon from '../../shared/Icons/HeartIcon';
import Map from './Components/Map';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import HeartFilledIcon from '../../shared/Icons/HeartFilledIcon';
import { toggleFavoriteLocal } from '../../core/services/Favorite';
import { getLocalStorage } from '../../core/services/Storage';
import TitlePagesSection from '../../shared/TitlePagesSection/TitlePagesSection';

let aux = 0;

const Apartment = () => {
   const { apartmentId } = useParams();
   const [currentProduct, setCurrentProduct] = useState(null);
   const [imageIndex, setImageIndex] = useState(1);
   const [isFavorite, setIsFavorite] = useState(false);
   const [currentDates, setCurrentDates] = useState();

   const getProduct = async () => {
      await getProductById(apartmentId).then(product => {
         setCurrentProduct(product[0]);
         setIsFavorite(product[0].isFavorite);
      });
   };

   const toggleFavorite = async () => {
      await toggleFavoriteLocal(currentProduct.id);
      setIsFavorite(!isFavorite);
   };

   useEffect(() => {
      getProduct();
      setCurrentDates(getLocalStorage('CURRENT_DATES'));
   }, []);

   useEffect(() => {
      if (!currentProduct) {
         return;
      }

      const loadingPageHide = gsap.to('.db-loading-page', {
         delay: 0.2,
         opacity: 0,
         display: 'none',
      });

      const mobileImagesObserver = new IntersectionObserver(
         entries => {
            entries.forEach(entry => {
               entry.intersectionRatio >= 0.6 &&
                  setImageIndex(parseInt(entry.target.dataset.index));
            });
         },
         { threshold: 0.6 }
      );

      const mobileImages = document.querySelectorAll('.db-mobile-images-container img');

      mobileImages.forEach(image => mobileImagesObserver.observe(image));

      setImageIndex(1);

      const sectionsAnimation = gsap.from('.db-apartment-container section', {
         delay: 0.2,
         opacity: 0,
         yPercent: 20,
         stagger: 0.2,
      });

      return () => {
         mobileImages.forEach(image => mobileImagesObserver.unobserve(image));
         sectionsAnimation.revert();
         loadingPageHide.revert();
      };
   }, [currentProduct, aux]);

   return (
      <>
         <LoadingScreen />
         {currentProduct && (
            <div className="db-apartment-container">
               <TitlePagesSection
                  title={currentProduct.title}
                  subtitle={currentProduct.category.title}
               />
               <Location location={currentProduct.location} rate={currentProduct.rate} />
               <div className="db-apartment-icons">
                  <span>
                     <ShareIcon />
                  </span>
                  {isFavorite ? (
                     <span onClick={toggleFavorite}>
                        <HeartFilledIcon isFavorite={isFavorite} />
                     </span>
                  ) : (
                     <span onClick={toggleFavorite}>
                        <HeartIcon />
                     </span>
                  )}
               </div>
               <Images imageIndex={imageIndex} images={currentProduct.images} />
               <Description title={currentProduct.title}>{currentProduct.description}</Description>
               <Amenities amenities={currentProduct.amenities} />
               <Availability
                  disabledDates={currentProduct.availability}
                  currentDates={currentDates}
                  id={currentProduct.id}
               />
               <Map currentProduct={currentProduct} />
               <Highlights highlights={currentProduct.items} />
            </div>
         )}
      </>
   );
};

export default Apartment;
