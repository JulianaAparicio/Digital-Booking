import { getReqAuth, putReq, putReqAuth } from "./axios";
import { baseUrl } from "./baseUrl";
import { mapProducts } from "./Product";
import { getLocalStorage, setLocalStorage } from "./Storage";

const FAVORITE_URL = `${baseUrl}/favorites`;

export async function toggleFavoriteLocal(productId, currentUser) {

    let currentFavorites = getLocalStorage("USER_FAVORITES") || [];
    const currentProductIndex  = currentFavorites.findIndex(product => product === productId);

    if (currentProductIndex < 0) {
        currentFavorites.push(productId);
    } else {
        currentFavorites.splice(currentProductIndex, 1);
    }

    if (currentUser) await putReqAuth(FAVORITE_URL, {userId: currentUser.id, productId})

    setLocalStorage("USER_FAVORITES", currentFavorites);

    return currentFavorites;
}

export async function getFavoritesByUser(id) {
    let products = []
    await getReqAuth(`${FAVORITE_URL}/${id}`).then((favorites) => {
        products = mapProducts(favorites)
        setLocalStorage("USER_FAVORITES", products.map((product) => product.id));
    })
    return products;
}