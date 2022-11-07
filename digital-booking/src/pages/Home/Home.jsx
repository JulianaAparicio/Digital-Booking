import { useEffect, useState, useContext } from 'react';
import './Home.scss';
import LocationIcon from '../../shared/Icons/locationIcon';
import Categories from './components/Categories/Categories';
import Recomendations from './components/Recomendations/Recomendations';
import Searcher from './components/Searcher/Searcher';
import gsap from 'gsap';
import { Context } from '../../core/Context';
import { getAllProducts, getProductByCategory, getProductByQuery } from '../../core/services/Product';

var options = [
   {
      id: 1,
      icon: <LocationIcon />,
      title: 'Pasto - Nariño',
      subtitle: 'Colombia',
   },
   {
      id: 2,
      icon: <LocationIcon />,
      title: 'Cartagena de Indias - Bolivar',
      subtitle: 'Colombia',
   },
   {
      id: 3,
      icon: <LocationIcon />,
      title: 'Medellin - Antioquia',
      subtitle: 'Colombia',
   },
];

const product = {
   images: [{
      id: 1,
      url: 'https://construccionesprisma.com.co/images/apartment_photos/22_41_pradoalto97.5m201.jpg',
      title: 'apto1',
   }],
   title: 'Title',
   category: {
      id: 1,
      title: 'Departamentos',
      description: '',
      imageURL: ''
   },
   amenities: [
      {id:'1', name: 'wifi'}, 
      {id:'2', name: 'pool'}
   ],
   description: 'En el corazón de San Telmo, disfruta de un albergue inspirado en las pasiones de Buenos Aires.',
   location: {
      id: 1,   
      city: {
         id: 1,
         name: '',
         state: '',
         country: ''
      },
      address: ''
   }
};

const products1 = new Array(8).fill(product);

const Home = () => {
   const appContext = useContext(Context);
   const [currentProducts, setCurrentProducts] = useState([]);

   const searchForm = {
      city: { state: useState(null), isValid: useState(false) },
      date: { state: useState(null), isValid: useState(false) },
   };

   const search = async () => {
      await getProductByQuery(searchForm).then((products) => setCurrentProducts(products));
   }

   const searchByCategory = async (category) => {
      await getProductByCategory(category).then((products) => setCurrentProducts(products));
   }

   useEffect(() => { 
      return () => {
         recommendationsAnimations().revert();
         categoriesAnimations().revert();
      };
   }, []);

   useEffect(() => {      
      if( searchForm.city.state[0] === null &&  searchForm.date.state[0] === null) {
         getProducts().then((products) => setCurrentProducts(products));
      } 
   }, [searchForm.city.state[0], searchForm.date.state[0]])

   return (
      <>
         <div id="home">
            <Searcher
               setDate={searchForm.date.state[1]}
               setPlace={searchForm.city.state[1]}
               setPlaceValidation={searchForm.city.isValid[1]}
               setDateValidation={searchForm.date.isValid[1]}
               typeHeadOptions={appContext.cities}
               search={search}
            />
            {appContext && (
               <Categories categories={appContext.categories && appContext.categories.slice(0, 4)} searchByCategory={searchByCategory}/>
            )}
            <Recomendations products={currentProducts.length ? currentProducts : products1} />
         </div>
      </>
   );
};

function categoriesAnimations() {
   return gsap.from('#home .db-categories .cards > a', {
      duration: 0.5,
      opacity: 0,
      yPercent: 20,
      stagger: 0.1,
      ease: 'power2.out',
   });
}

function recommendationsAnimations() {
   return gsap.from('#home .db-recommendations .cards .db-card', {
      duration: 0.5,
      opacity: 0,
      scale: 0.6,
      stagger: 0.2,
      ease: 'power2.out',
   });
}

async function getProducts() {
   return await getAllProducts();
}

export default Home;
