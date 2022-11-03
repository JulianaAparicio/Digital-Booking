import { formStateMapper } from "../../utils/formStateMapper";
import { postReq } from "./axios";

const usersURL = ''

export async function registerUser(userForm) {
    const userInfo = formStateMapper(userForm);
    //return await postReq(usersURL, userInfo);
    return userInfo;
}

export async function loginUser(loginForm) {
    const credentials = formStateMapper(loginForm);
    const user = {
        name: 'Usuario',
        lastName: 'Logged',
        email: 'user@gmail.com',
        password: '1234567'
    }

    return user.email === credentials.email && user.password === credentials.password ? user : null;
}