import { formStateMapper } from "../../utils/formStateMapper";
import { getReq } from "./axios";

const PRODUCT_URL = 'http://localhost:8080/products';

export async function getAllProducts() {
    return getReq(PRODUCT_URL);
}

export async function getProductById(id) {
    const url = `${PRODUCT_URL}/${id}`;
    return getReq(url);
}

export async function getProductByCategory(category) {
    const url = `${PRODUCT_URL}`;
    return getReq(url, {category});
}

export async function getProductByQuery(queryForm) {
    const query = formStateMapper(queryForm);
    if (query.date) {
        query.date = query.date.toString();
        if (query.date.length <=1) delete query.date;
    }
    return getReq(PRODUCT_URL, query);
}