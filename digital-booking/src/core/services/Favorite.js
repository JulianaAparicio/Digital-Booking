import { postReq, putReq } from "./axios";
import { baseUrl } from "./baseUrl";

const FAVORITE_URL = `${baseUrl}/favorites`;

export async function toggleFavoriteLocal(productId) {
    let currentFavorites = JSON.parse(localStorage.getItem("USER_FAVORITES")) || [];
    let currentUser = JSON.parse(sessionStorage.getItem("CURRENT_USER"));
    const currentProductIndex  = currentFavorites.findIndex(product => product === productId);

    if (currentProductIndex < 0) {
        currentFavorites.push(productId);
    } else {
        currentFavorites.splice(currentProductIndex, 1);
    }

    if (currentUser) await putReq(FAVORITE_URL, {userId: currentUser.id, productId})

    localStorage.setItem("USER_FAVORITES", JSON.stringify(currentFavorites));

    return currentFavorites;
}