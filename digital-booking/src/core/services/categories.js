import { getReq } from "./axios";
import { baseUrl } from "./baseUrl";

const CATEGORY_URL = `${baseUrl}/categories`

export async function getAllCategories() {
   return getReq(CATEGORY_URL);
}