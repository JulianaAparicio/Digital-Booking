import './ProductCard.scss';

export default function ProductImage({url, productName}) {
    return (
        <div className="db-product-image">
            <img src={url} alt={productName} title={productName} width="100%" height="100%"/>
        </div>
    )
}