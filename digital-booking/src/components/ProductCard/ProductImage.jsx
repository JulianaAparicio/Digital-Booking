import HeartFilledIcon from '../../shared/Icons/HeartFilledIcon';
import './ProductCard.scss';

export default function ProductImage({url, productName, addFavorite, isFavorite}) {
    return (
        <div className="db-product-image">
            <img src={url} alt={productName} title={productName} width="100%" height="100%"/>
            <span className={isFavorite ? 'db-favorite' : ''} onClick={addFavorite}>
                <HeartFilledIcon isFavorite={isFavorite} />
            </span>
        </div>
    )
}