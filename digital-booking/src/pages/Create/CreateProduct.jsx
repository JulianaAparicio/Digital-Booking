import './createProductStyles.scss';
import CreationForm from './components/CreationForm';
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import { createContext } from 'react';
import { Context } from '../../core/Context';
import gsap from 'gsap';
import LoadingScreen from './../../components/LoadingScreen/LoadingScreen';
import { getAllAmenities } from '../../core/services/Amenities';
import TitlePagesSection from '../../shared/TitlePagesSection/TitlePagesSection';
import { createProduct } from '../../core/services/Product';
import Thanks from '../Reservation/components/Thanks';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Error from '../Reservation/components/Error';

export const StateContext = createContext(null);

const States = {
   Null: 1,
   Loading: 2,
   Success: 3,
   Error: 4,
};

const CreateProduct = () => {
   const context = useContext(Context);
   const navigate = useNavigate();

   const [amenities, setAmenities] = useState(null);
   const [isValid, setIsValid] = useState(false);
   const [isLoading, setIsLoading] = useState(States.Null);
   const [redirectionUrl, setRedirectionUrl] = useState('/');

   const thanksContainer = useRef(null);
   const errorContainer = useRef(null);

   const creationForm = {
      name: { state: useState(null) },
      category: {
         state: useState(null),
      },
      direction: { state: useState(null) },
      city: {
         state: useState(
            context.cities.slice(1, -1).at(0)
               ? `${context.cities.slice(1, -1).at(0).name} - ${
                    context.cities.slice(1, -1).at(0).state
                 } `
               : null
         ),
      },
      description: { state: useState(null) },
      amenities: { state: useState([]) },
      rules: { state: useState(null) },
      security: { state: useState(null) },
      cancellation: { state: useState(null) },
      images: { state: useState([]) },
      latitude: { state: useState(null) },
      longitude: { state: useState(null) },
   };

   useEffect(() => {
      setIsValid(true);

      if (Object.values(creationForm).some(({ state }) => state[0] == false || state[0] === null)) {
         setIsValid(false);
      }

      console.log(isValid);
   }, [creationForm]);

   useEffect(() => {
      if (!context.categories.at(0) || !context.cities.at(0)) return;

      if (!context.user?.role || context.user?.role !== 'ADMIN') {
         navigate('/');
      }

      creationForm.category.state[1](context.cities.at(0).id);
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

   const submitProduct = async () => {
      if (!isValid) {
         console.error('No todos los campos están completos');
         return;
      }

      const city = context.cities.find(city => city.id == creationForm.city.state[0]);

      const politics = creationForm.cancellation.state.at(0)?.map(el => ({
         politic: {
            title: 'Política de cancelación',
            id: 2,
         },
         description: el,
      }));

      const rules = creationForm.rules.state.at(0)?.map(el => ({
         politic: {
            title: 'Normas de la casa',
            id: 1,
         },
         description: el,
      }));

      const security = creationForm.security.state.at(0)?.map(el => ({
         politic: {
            title: 'Salud y seguridad',
            id: 3,
         },
         description: el,
      }));

      const producto = {
         title: creationForm.name.state[0],
         description: creationForm.description.state[0],
         category: {
            id: creationForm.category.state[0],
         },
         amenities: creationForm.amenities.state[0].map(el => ({ id: el })),
         images: creationForm.images.state[0].map((image, i) => ({
            title: `${creationForm.name.state[0]?.toUpperCase()}_${i + 1}`,
            url: image,
         })),
         location: {
            address: creationForm.direction.state[0],
            latitude: creationForm.latitude.state[0],
            longitude: creationForm.longitude.state[0],
            city,
         },
         items: [...politics, ...rules, ...security],
         // ratings: [],
         // availability: [],
      };

      setIsLoading(States.Loading);

      createProduct(producto)
         .then(({ data }) => {
            setIsLoading(States.Success);
            setRedirectionUrl(`/product/${data.id}`);
         })
         .catch(err => {
            console.error(err);
            setIsLoading(States.Error);
         });
   };

   useEffect(() => {
      if (isLoading === States.Loading) {
         gsap.to('.db-loading-page', {
            opacity: 1,
            display: 'flex',
         });
      }

      if (isLoading === States.Success || isLoading === States.Error) {
         gsap.to('.db-loading-page', {
            opacity: 0,
            display: 'none',
         });
      }

      if (isLoading === States.Success) {
         thanksContainer.current.style.display = 'flex';

         gsap.from('.db-thanks-container .db-card', {
            delay: 0.2,
            scale: 0,
            ease: 'elastic.out(1, 1)',
         });
      }

      if (isLoading === States.Error) {
         errorContainer.current.style.display = 'flex';

         gsap.from('.db-error-container .db-card', {
            delay: 0.2,
            scale: 0,
            ease: 'elastic.out(1, 1)',
         });
      }
   }, [isLoading]);

   return (
      <>
         <Error ref={errorContainer} action={() => setIsLoading(States.Null)} />
         <Thanks ref={thanksContainer} redirection={redirectionUrl}>
            Tu producto ha sido creado con éxito.
         </Thanks>
         <StateContext.Provider value={creationForm}>
            <div className="db-creation-page">
               <LoadingScreen />
               <TitlePagesSection title={'Administración'} />
               {amenities && (
                  <CreationForm
                     submitProduct={submitProduct}
                     isValid={isValid}
                     amenities={amenities}
                  />
               )}
            </div>
         </StateContext.Provider>
      </>
   );
};

export default CreateProduct;
