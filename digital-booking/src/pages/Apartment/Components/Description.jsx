const Description = ({ children, title }) => {
   return (
      <section className="db-apartment-description">
         <h1>{title}</h1>
         <p>{children}</p>
      </section>
   );
};

export default Description;
