import { useParams } from 'react-router-dom';

const Apartment = () => {
   const { apartmentId } = useParams();

   return <div>{apartmentId}</div>;
};

export default Apartment;
