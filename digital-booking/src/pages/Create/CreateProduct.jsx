import './createProductStyles.scss';
import CreateHeader from './components/CreateHeader';
import CreationForm from './components/CreationForm';
import { useState } from 'react';
import { useEffect } from 'react';
import { createContext } from 'react';

export const StateContext = createContext(null);

const CreateProduct = () => {
   const [isValid, setIsValid] = useState(false);

   const creationForm = {
      name: { state: useState(null) },
      category: { state: useState(null) },
      direction: { state: useState(null) },
      city: { state: useState(null) },
      description: { state: useState(null) },
      amenities: { state: useState([]) },
      rules: { state: useState(null) },
      security: { state: useState(null) },
      cancellation: { state: useState(null) },
      images: { state: useState([]) },
   };

   useEffect(() => {
      setIsValid(true);

      Object.values(creationForm).forEach(({ state }) => state[0] == false && setIsValid(false));

      console.log(isValid);
   }, [creationForm]);

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
