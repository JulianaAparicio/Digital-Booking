import { useNavigate } from 'react-router-dom';
import BackButtonIcon from '../../../shared/Icons/BackButtonIcon';

const CreateHeader = ({ children }) => {
   const browserNavigate = useNavigate();

   const goBack = () => {
      browserNavigate(-1);
   };

   return (
      <div className="db-apartment-header">
         <h1>{children}</h1>
         <div onClick={goBack}>
            <BackButtonIcon />
         </div>
      </div>
   );
};

export default CreateHeader;
