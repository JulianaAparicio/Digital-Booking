import CategoryCard from '../../../../components/CategoryCard/CategoryCard';

const Categories = ({ categories, searchByCategory }) => {
   return (
      <section className="db-categories">
         <h2>Buscar por tipo de alojamiento</h2>
         <article className="cards">
            {categories.map(($category, i) => (
               <CategoryCard category={$category} key={i} filterByCategory={searchByCategory}/>
            ))}
         </article>
      </section>
   );
};

export default Categories;
