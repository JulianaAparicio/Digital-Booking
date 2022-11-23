import { formStateMapper } from "../../utils/formStateMapper";
import { postReq } from "./axios";
import { baseUrl } from "./baseUrl";

const USERS_URL = `${baseUrl}/users`;

export default async function registerUser(userForm) {
    const queryUserForm = formStateMapper(userForm);

    return postReq(`${USERS_URL}/register`, queryUserForm);
}