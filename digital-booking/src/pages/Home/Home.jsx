import { useEffect, useState, useContext } from 'react';
import './Home.scss';
import LocationIcon from '../../shared/Icons/locationIcon';
import Categories from './components/Categories/Categories';
import Recomendations from './components/Recomendations/Recomendations';
import Searcher from './components/Searcher/Searcher';
import gsap from 'gsap';
import { Context } from '../../core/Context';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';

var options = [
   {
      id: 'PTO',
      icon: <LocationIcon />,
      title: 'Pasto - Nariño',
      subtitle: 'Colombia',
   },
   {
      id: 'CTA',
      icon: <LocationIcon />,
      title: 'Cartagena de Indias - Bolivar',
      subtitle: 'Colombia',
   },
   {
      id: 'MDE',
      icon: <LocationIcon />,
      title: 'Medellin - Antioquia',
      subtitle: 'Colombia',
   },
];

const product = {
   image: {
      url: 'https://construccionesprisma.com.co/images/apartment_photos/22_41_pradoalto97.5m201.jpg',
      productName: 'apto1',
   },
   info: {
      title: 'Title',
      category: 'Departamentos',
      points: 8,
      textRate: 'Muy bueno',
      distance: 'A 900 m del centro',
      location: 'MDE',
      amenities: ['wifi', 'pool'],
      description:
         'En el corazón de San Telmo, disfruta de un albergue inspirado en las pasiones de Buenos Aires.',
   },
};

const product2 = {
   image: {
      url: 'https://construccionesprisma.com.co/images/apartment_photos/22_41_pradoalto97.5m201.jpg',
      productName: 'apto2',
   },
   info: {
      title: 'Title',
      category: 'Hoteles',
      points: 10,
      textRate: 'Excelente',
      distance: 'A 1.5 km del centro',
      location: 'MDE',
      amenities: ['wifi', 'pool'],
      description:
         'En el corazón de San Telmo, disfruta de un albergue inspirado en las pasiones de Buenos Aires.',
   },
};

const product3 = {
   image: {
      url: 'https://construccionesprisma.com.co/images/apartment_photos/22_41_pradoalto97.5m201.jpg',
      productName: 'apto3',
   },
   info: {
      title: 'Title',
      category: 'Casas',
      points: 6,
      textRate: 'Regular',
      distance: 'A 2.5 km del centro',
      location: 'MDE',
      amenities: [],
      description:
         'En el corazón de San Telmo, disfruta de un albergue inspirado en las pasiones de Buenos Aires.',
   },
};

const product4 = {
   image: {
      url: 'https://construccionesprisma.com.co/images/apartment_photos/22_41_pradoalto97.5m201.jpg',
      productName: 'apto4',
   },
   info: {
      title: 'Title',
      category: 'Habitaciones',
      points: 7,
      textRate: 'Bueno',
      distance: 'A 3.5 km del centro',
      location: 'MDE',
      amenities: ['wifi'],
      description:
         'En el corazón de San Telmo, disfruta de un albergue inspirado en las pasiones de Buenos Aires.',
   },
};

const products = [product, product2, product3, product4, product, product2, product3, product4];

const Home = () => {
   const categoriesContext = useContext(Context);

   const searchForm = {
      place: { state: useState(null), isValid: useState(false) },
      date: { state: useState(null), isValid: useState(false) },
   };

   useEffect(() => {
      const categoriesAnimations = gsap.from('#home .db-categories .cards > a', {
         duration: 0.5,
         opacity: 0,
         yPercent: 20,
         stagger: 0.1,
         ease: 'power2.out',
      });

      const recomendationsAnimations = gsap.from('#home .db-recommendations .cards .db-card', {
         duration: 0.5,
         opacity: 0,
         scale: 0.6,
         stagger: 0.2,
         ease: 'power2.out',
      });
      return () => {
         recomendationsAnimations.revert();
         categoriesAnimations.revert();
      };
   }, []);

   return (
      <>
         <div id="home">
            <Searcher
               setDate={searchForm.date.state[1]}
               setPlace={searchForm.place.state[1]}
               setPlaceValidation={searchForm.place.isValid[1]}
               setDateValidation={searchForm.date.isValid[1]}
               typeHeadOptions={options}
            />
            {categoriesContext && (
               <Categories categories={categoriesContext.categories.slice(0, 4)} />
            )}
            <Recomendations products={products} />
         </div>
      </>
   );
};

export default Home;
