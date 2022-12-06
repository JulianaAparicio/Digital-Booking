import './createProductStyles.scss';
import CreateHeader from './components/CreateHeader';
import CreationForm from './components/CreationForm';
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import { createContext } from 'react';
import { Context } from '../../core/Context';
import gsap from 'gsap';
import LoadingScreen from './../../components/LoadingScreen/LoadingScreen';
import { getAllAmenities } from '../../core/services/Amenities';

export const StateContext = createContext(null);

const CreateProduct = () => {
   const context = useContext(Context);

   const [amenities, setAmenities] = useState(null);
   const [isValid, setIsValid] = useState(false);

   const creationForm = {
      name: { state: useState(null) },
      category: {
         state: useState(null),
      },
      direction: { state: useState(null) },
      city: {
         state: useState(
            context.cities.slice(1, -1).at(0) ? context.cities.slice(1, -1).at(0).name : null
         ),
      },
      description: { state: useState(null) },
      amenities: { state: useState([]) },
      rules: { state: useState(null) },
      security: { state: useState(null) },
      cancellation: { state: useState(null) },
      images: { state: useState([]) },
   };

   useEffect(() => {
      setIsValid(true);

      Object.values(creationForm).some(({ state }) => state[0] == false || state[0] === null) &&
         setIsValid(false);
   }, [creationForm]);

   useEffect(() => {
      if (!context.categories.at(0) || !context.cities.at(0)) return;

      creationForm.category.state[1](context.cities.slice(1, -1).at(0).id);
      creationForm.city.state[1](context.cities.slice(1, -1).at(0).id);
   }, [context]);

   useEffect(() => {
      if (!context || !amenities) return;

      const animationsCtx = gsap.context(() => {
         gsap.to('.db-loading-page', {
            opacity: 0,
            display: 'none',
         });

         gsap.from('.db-input, h2', {
            delay: 0.2,
            duration: 0.3,
            opacity: 0,
            scale: 0.5,
            stagger: 0.1,
         });
         gsap.from('.db-button:not(.animations-excent)', {
            delay: 0.2,
            duration: 0.8,
            scale: 0,
            rotate: 360,
            ease: 'elastic.out(2, 1.5)',
            stagger: 0.1,
         });
      }, '.db-creation-page');

      return () => {
         animationsCtx.revert();
      };
   }, [context, amenities]);

   useEffect(() => {
      getAllAmenities().then(setAmenities);
   }, []);

   const submitProduct = () => {
      if (!isValid) {
         console.error('No todos los campos están completos');
         return;
      }

      const city = context.cities.find(city => city.id == creationForm.city.state[0]);

      const politics = creationForm.cancellation.state.at(0)?.map(el => ({
         politic: {
            id: 1,
         },
         description: el,
      }));

      const rules = creationForm.rules.state.at(0)?.map(el => ({
         politic: {
            id: 2,
         },
         description: el,
      }));

      const security = creationForm.security.state.at(0)?.map(el => ({
         politic: {
            id: 3,
         },
         description: el,
      }));

      //el siguiente objeto es lo que se debe enviar
      const producto = {
         title: creationForm.name.state[0],
         description: creationForm.description.state[0],
         category: {
            id: creationForm.category.state[0],
         },
         amenities: [creationForm.amenities.state[0].map(el => ({ id: el }))],
         images: [
            creationForm.images.state[0].map((image, i) => ({
               title: `${creationForm.name.state[0]?.toUpperCase()}_${i + 1}`,
               url: image,
            })),
         ],
         location: {
            address: creationForm.direction.state[0],
            // longitude: '6.5550639',
            // latitude: '-75.8443219',
            city,
         },
         items: [...politics, ...rules, ...security],
         // ratings: [],
         // availability: [],
      };

      console.log(producto);
   };

   return (
      <StateContext.Provider value={creationForm}>
         <div className="db-creation-page">
            <LoadingScreen />
            <CreateHeader>Administración</CreateHeader>
            {amenities && (
               <CreationForm
                  submitProduct={submitProduct}
                  isValid={isValid}
                  amenities={amenities}
               />
            )}
         </div>
      </StateContext.Provider>
   );
};

export default CreateProduct;
