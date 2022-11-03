import { getReq } from "./axios";

const CATEGORY_URL = 'http://localhost:8080/categories'

export async function getAllCategories() {
    return getReq(CATEGORY_URL);
}