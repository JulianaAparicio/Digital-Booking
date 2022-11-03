import Card from '../../shared/Card/Card';
import { addDots } from '../../utils/numberFormater';
import './CategoryCard.scss';

const CategoryCard = ({ category }) => {
   return (
      <a href={'#' /* here goes the link based on the category name */}>
         <Card classList={'db-card-category'}>
            <img className="db-card-category-image" src={category.imageURL} alt={category.title} />
            <div className="db-card-category-content">
               <h3>{category.title}</h3>
               <p>{`${addDots.format(category.description)} ${category.title.toLowerCase()}`}</p>
            </div>
         </Card>
      </a>
   );
};

export default CategoryCard;
