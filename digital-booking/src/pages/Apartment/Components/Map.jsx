import SectionTitle from '../../../components/SectionTitle/SectionTitle';

const Map = ({ currentProduct }) => {
   return (
      <section className="db-apartment-map">
         <SectionTitle underline>¿Dónde vas a estar?</SectionTitle>
         <p>{`${currentProduct.location.city.name}, ${currentProduct.location.city.country}`}</p>
         <div>
            <iframe
               className="db-product-map"
               frameBorder="0"
               referrerPolicy="no-referrer-when-downgrade"
               src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAAWqIsm_JZtUYIW0OowHuGiMZIEJRX8F4&q=${currentProduct.title.replace(
                  '" ","+"'
               )},${currentProduct.location.city.name}+${currentProduct.location.city.country}`}
            />
         </div>
      </section>
   );
};

export default Map;
