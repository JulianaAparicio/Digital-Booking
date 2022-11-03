import axios from 'axios';

export async function getReq(url, params) {
    return (await axios.get(url, {params})).data;
}

export async function postReq(url, body) {
    return await axios.post(url, Json.stringify(body));
}