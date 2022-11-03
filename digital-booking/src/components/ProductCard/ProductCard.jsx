import Card from '../../shared/Card/Card';
import SideMainLayout from '../../shared/Layouts/SideMainLayout';
import ProductDescription from './ProductDescription';
import ProductImage from './ProductImage';

export default function ProductCard({product}) {
    return (
        <Card classList={'db-card-product'}>
            <SideMainLayout side={<ProductImage url={product.images.length ? product.images[0].url: ''} productName={product.images.length ? product.images[0].title : ''}  />} main={<ProductDescription {...product} />} />
        </Card>
    ) 
}