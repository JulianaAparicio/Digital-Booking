import ProductCard from '../../../../components/ProductCard/ProductCard';

const Recomendations = ({ products }) => {
   return (
      <section className="db-recommendations">
         <h2>Recomendaciones</h2>
         <article className="cards">
            {products.map(($product, i) => (
               <ProductCard key={i} product={$product} />
            ))}
         </article>
      </section>
   );
};

export default Recomendations;
