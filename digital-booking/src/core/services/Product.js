import { formStateMapper } from "../../utils/formStateMapper";
import { getReq } from "./axios";
import { baseUrl } from './baseUrl';

const PRODUCT_URL = `${baseUrl}/products`;

export async function getAllProducts() {
   return getReq(PRODUCT_URL).then((products) => {
      return mapProducts(products);
   });
}

export async function getProductById(id) {
   const url = `${PRODUCT_URL}/${id}`;
   return getReq(url).then((product) => {
      return mapProducts([product]);
   });
}

export async function getProductByCategory(category) {
   const url = `${PRODUCT_URL}`;
   return getReq(url, { category }).then((products) => {
      return mapProducts(products);
   });
}

export async function getProductByQuery(queryForm) {
   const query = formStateMapper(queryForm);
   if (query.date) {
      query.date = query.date.toString();
      if (query.date.length <= 1) delete query.date;
   }
   return getReq(PRODUCT_URL, query).then((products) => {
      return mapProducts(products);
   });
}

export function mapProducts(products) {
   const favoriteProducts = JSON.parse(localStorage.getItem("USER_FAVORITES")) || [];
   return products.map((product) => {
      return {
         ...product,
         isFavorite: favoriteProducts.includes(product.id)
      }
   })
}