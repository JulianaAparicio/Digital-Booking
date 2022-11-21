import { useContext } from "react";
import { Context } from "../Context";
import { putReq } from "./axios";
import { baseUrl } from "./baseUrl";
import { getLocalStorage, setLocalStorage } from "./Storage";

const FAVORITE_URL = `${baseUrl}/favorites`;

export async function toggleFavoriteLocal(productId) {
    const appContext = useContext(Context);

    let currentFavorites = getLocalStorage("USER_FAVORITES") || [];
    let currentUser = appContext.user;
    const currentProductIndex  = currentFavorites.findIndex(product => product === productId);

    if (currentProductIndex < 0) {
        currentFavorites.push(productId);
    } else {
        currentFavorites.splice(currentProductIndex, 1);
    }

    if (currentUser) await putReq(FAVORITE_URL, {userId: currentUser.id, productId})

    setLocalStorage("USER_FAVORITES", currentFavorites);

    return currentFavorites;
}