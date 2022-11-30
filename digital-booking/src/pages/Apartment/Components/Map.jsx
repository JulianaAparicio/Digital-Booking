import SectionTitle from '../../../components/SectionTitle/SectionTitle';

const Map = ({ currentProduct }) => {
   const location = (l => `${l.latitude},${l.longitude}`)(currentProduct.location);

   return (
      <section className="db-apartment-map">
         <SectionTitle underline>¿Dónde vas a estar?</SectionTitle>
         <p>{`${currentProduct.location.city.name}, ${currentProduct.location.city.country}`}</p>
         <div>
            <iframe
               className="db-product-map"
               frameBorder="0"
               referrerPolicy="no-referrer-when-downgrade"
               src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAAWqIsm_JZtUYIW0OowHuGiMZIEJRX8F4&q=${location}`}
            />
         </div>
      </section>
   );
};

export default Map;
