import axios from 'axios';

export async function getReq(url, params) {
   return (await axios.get(url, { params })).data;
}

export async function postReq(url, body) {
   return await axios.post(url, JSON.stringify(body), {headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*'
    }});
}

export async function putReq(url, body) {
   return await axios.put(url, JSON.stringify(body), {headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*'
    }});
}

export async function deleteReq(url, body) {
   return await axios.delete(url, {data: body});
}