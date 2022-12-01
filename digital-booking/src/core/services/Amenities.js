import { getReq } from "./axios";
import { baseUrl } from "./baseUrl";

const AMENITY_URL = `${baseUrl}/amenities`;

export async function getAllAmenities() {
   return getReq(AMENITY_URL);
}