import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import Layout from './Layout';

const Highlights = ({ highlights }) => {
   const highlightsMapper = () => {
      const highlightsGroup = highlights.reduce((acc, highlight) => {
         if (!acc[`${highlight.politic.title}`]) acc[`${highlight.politic.title}`] = [];
         acc[`${highlight.politic.title}`] = [
            ...acc[`${highlight.politic.title}`],
            highlight.description,
         ];
         return acc;
      }, {});
      return Object.keys(highlightsGroup).map(key => {
         return {
            title: key,
            items: highlightsGroup[key],
         };
      });
   };

   return (
      <section className="db-apartment-highlights">
         <SectionTitle underline>Qué tienes que saber</SectionTitle>
         <Layout>
            {highlightsMapper().map(highlight => (
               <div key={highlight.title} className="db-highlight">
                  <h3>{highlight.title}</h3>
                  <ul>
                     {highlight.items.map(item => (
                        <li key={item}>
                           <p>{item}</p>
                        </li>
                     ))}
                  </ul>
               </div>
            ))}
         </Layout>
      </section>
   );
};

export default Highlights;
