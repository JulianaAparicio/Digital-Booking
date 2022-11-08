import { useEffect } from 'react';
import { useState } from 'react';
import Card from '../../shared/Card/Card';
import SideMainLayout from '../../shared/Layouts/SideMainLayout';
import ProductDescription from './ProductDescription';
import ProductImage from './ProductImage';

export default function ProductCard({product, toggleFavorite}) {


    const toggleFav = async () => {
        toggleFavorite(product.id);
    }

    useEffect(() => {
    }, [product])
    return (
        <Card classList={'db-card-product'}>
            <SideMainLayout side={<ProductImage addFavorite={toggleFav} isFavorite={product.isFavorite} url={product.images.length ? product.images[0].url: ''} productName={product.images.length ? product.images[0].title : ''}  />} main={<ProductDescription {...product} />} />
        </Card>
    ) 
}