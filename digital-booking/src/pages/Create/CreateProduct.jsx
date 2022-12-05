import './createProductStyles.scss';
import CreateHeader from './components/CreateHeader';
import CreationForm from './components/CreationForm';
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import { createContext } from 'react';
import { Context } from '../../core/Context';

export const StateContext = createContext(null);

const CreateProduct = () => {
   const [isValid, setIsValid] = useState(false);
   const context = useContext(Context);

   const creationForm = {
      name: { state: useState(null) },
      category: {
         state: useState(null),
      },
      direction: { state: useState(null) },
      city: { state: useState(context.cities.at(0) ? context.cities.at(0).name : 'no') },
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

      console.log(isValid);
   }, [creationForm]);

   useEffect(() => {
      if (!context.categories.at(0) || !context.cities.at(0)) return;

      creationForm.category.state[1](context.categories.at(0).title);
      creationForm.city.state[1](context.cities.at(0).name);
   }, [context]);

   return (
      <StateContext.Provider value={creationForm}>
         <div className="db-creation-page">
            <CreateHeader>Administración</CreateHeader>
            <CreationForm isValid={isValid} />
         </div>
      </StateContext.Provider>
   );
};

export default CreateProduct;
