import axios from 'axios';
import { getToken } from './Token';

export async function getReq(url, params) {
   return (await axios.get(url, { params })).data;
}

export async function getReqAuth(url, params) {
   return (await axios.get(url, { params, headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "Authorization": `Bearer ${getToken()}`,
    }})).data;
}

export async function postReq(url, body) {
   return await axios.post(url, JSON.stringify(body), {headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    }});
}

export async function postAuthReq(url, body) {
   return await axios.post(url, JSON.stringify(body), {headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "Authorization": `Bearer ${getToken()}`,
    }});
}

export async function putReq(url, body) {
   return await axios.put(url, JSON.stringify(body), {headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    }});
}

export async function deleteReq(url, body) {
   return await axios.delete(url, {data: body});
}