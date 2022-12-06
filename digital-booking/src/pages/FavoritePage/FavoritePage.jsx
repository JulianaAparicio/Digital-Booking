import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFavoritesByUser } from "../../core/services/Favorite";
import TitlePagesSection from "../../shared/TitlePagesSection/TitlePagesSection";
import LoadingComponent from "../Home/components/LoadingComponent/LoadingComponent";
import Recomendations from "../Home/components/Recomendations/Recomendations";
import { ProductMap } from "../Home/contexts/productMap";

export default function FavoritePage() {
    const { userId } = useParams();
    const [productMap, setProductMap] = useState(null);

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        getFavoritesByUser(userId).then((userFavorites) => {
            setFavorites(userFavorites)
        })
    }, [userId])

    return (
        <ProductMap.Provider value={{ productMap, setProductMap }}>

            <TitlePagesSection
               title={'Mis Favoritos'}
            />

            <div className="db-component-container db-recommendations-container">
               {/* <LoadingComponent /> */}
               {favorites.length ? <Recomendations products={favorites} title={'Favoritos'} /> : <div>No se encontraron resultados</div>}
            </div>
        </ProductMap.Provider>
    )
}