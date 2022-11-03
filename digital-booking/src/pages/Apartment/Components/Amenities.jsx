import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import Amenity from '../../../shared/Amenity/Amenity';
import Layout from './Layout';

const Amenities = ({ amenities }) => {
   return (
      <section className="db-apartment-amenities">
         <SectionTitle underline>¿Que ofrece este lugar?</SectionTitle>
         <div className="db-amenities-container">
            <Layout>
               {amenities.map(amenity => (
                  <Amenity type={amenity} key={amenity} label={amenity} />
               ))}
            </Layout>
         </div>
      </section>
   );
};

export default Amenities;
