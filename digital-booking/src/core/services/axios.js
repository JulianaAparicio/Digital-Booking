import axios from 'axios';

export async function getReq(url) {
    return await axios.get(url);
}

export async function postReq(url, body) {
    return await axios.post(url, Json.stringify(body));
}