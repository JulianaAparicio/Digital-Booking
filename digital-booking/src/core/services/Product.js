import { formStateMapper } from "../../utils/formStateMapper";
import { getReq, postAuthReq } from "./axios";
import { baseUrl } from './baseUrl';
import { setLocalStorage, getLocalStorage } from "./Storage";

const PRODUCT_URL = `${baseUrl}/products`;

export async function getAllProducts() {
   return getReq(PRODUCT_URL).then((products) => {
      return mapProducts(products);
   });
}

export async function getProductById(id) {
   const url = `${PRODUCT_URL}/${id}`;
   return getReq(url).then((product) => {
      return getAvailabilityByProductId(product.id).then((availability) => {
         product.availability = availability;
         return mapProducts([product]);
      })
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
      setLocalStorage("CURRENT_DATES", query.date);
      query.date = query.date.toString();
   }
   return getReq(PRODUCT_URL, query).then((products) => {
      return mapProducts(products);
   });
}

export async function getAvailabilityByProductId(id) {
   return getReq(`${PRODUCT_URL}/availability/${id}`);
}

export async function createProduct(productForm) {
   const productMapper = formStateMapper(productForm);
   const newProduct = {
      ...productMapper,
      ratings: [],
      availability: []
   }
   return postAuthReq(PRODUCT_URL, newProduct);
}

export function mapProducts(products) {
   const favoriteProducts = getLocalStorage("USER_FAVORITES") || [];
   return products.map((product) => {
      const score =product.ratings.length ? Math.round(product.ratings.reduce((acc, rate) => acc + rate.score,0) / product.ratings.length) : 0;
      return {
         ...product,
         isFavorite: favoriteProducts.includes(product.id),
         rate: {
            score,
            qualification: productQualification(score)
         }
      }
   })
}


function productQualification(rate) {
   switch (rate * 2) {
      case 0:
         return "";
      case 1:
      case 2:
         return "Pesimo";
      case 3:
      case 4:
         return "Malo";
      case 5:
      case 6:
         return "Regular";
      case 7:
      case 8:
         return "Bueno";
      case 9:
      case 10:
         return "Excelente";
   }
}