import { getReq } from "./axios";

const CITY_URL = 'http://localhost:8080/cities';

export async function getAllCities() {
    return getReq(CITY_URL);
}