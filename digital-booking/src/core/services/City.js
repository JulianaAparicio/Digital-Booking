import { getReq } from "./axios";
import { baseUrl } from "./baseUrl";

const CITY_URL = `${baseUrl}/cities`;

export async function getAllCities() {
   return getReq(CITY_URL);
}