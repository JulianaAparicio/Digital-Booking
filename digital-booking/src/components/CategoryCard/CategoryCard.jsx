import Card from '../../shared/Card/Card';
import { addDots } from '../../utils/numberFormater';
import './CategoryCard.scss';

const CategoryCard = ({ category, filterByCategory }) => {

   const search = () => {
      filterByCategory(category.id)
   }

   return (
      <div onClick={search}>
         <Card classList={'db-card-category'}>
            <img className="db-card-category-image" src={category.imageURL} alt={category.title} />
            <div className="db-card-category-content">
               <h3>{category.title}</h3>
               <p>{`${addDots.format(category.description)} ${category.title.toLowerCase()}`}</p>
            </div>
         </Card>
      </div>
   );
};

export default CategoryCard;
