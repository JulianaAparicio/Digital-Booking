import HeartFilledIcon from '../../shared/Icons/HeartFilledIcon';
import './ProductCard.scss';

export default function ProductImage({url, productName, addFavorite, isFavorite, id}) {
    const toggleFav = () => {
        addFavorite(id);
     };

    return (
        <div className="db-product-image">
            <img src={url} alt={productName} title={productName} width="100%" height="100%"/>
            <span className={isFavorite ? 'db-favorite' : ''} onClick={toggleFav}>
                <HeartFilledIcon isFavorite={isFavorite} />
            </span>
        </div>
    )
}