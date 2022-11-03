import CategoryCard from '../../../../components/CategoryCard/CategoryCard';

const Categories = ({ categories }) => {
   return (
      <section className="db-categories">
         <h2>Buscar por tipo de alojamiento</h2>
         <article className="cards">
            {categories.map(($category, i) => (
               <CategoryCard category={$category} key={i} />
            ))}
         </article>
      </section>
   );
};

export default Categories;
