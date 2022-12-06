import { formStateMapper } from "../../utils/formStateMapper";
import { postReq } from "./axios";
import { baseUrl } from "./baseUrl";
import { removeLocalStorage } from "./Storage";
import { removeToken } from "./Token";

const AUTH_URL = `${baseUrl}/auth`;

export async function loginUser(credentials) {
    const queryCredentials = formStateMapper(credentials);

    return (await postReq(AUTH_URL, queryCredentials)).data;
}

export async function logoutUser() {
    removeToken();
    removeLocalStorage("USER_FAVORITES");
}