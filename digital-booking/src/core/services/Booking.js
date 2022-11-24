import { formStateMapper } from "../../utils/formStateMapper";
import { postAuthReq } from "./axios";
import { baseUrl } from "./baseUrl";

const BOOKING_URL = `${baseUrl}/booking`;


export async function bookingProduct(bookingForm) {
    const bookingQuery = formStateMapper(bookingForm);
    const bookingQueryMapper = {
        userId: bookingQuery.userId,
        productId: bookingQuery.productId,
        initialDate: new Date(bookingQuery.dates[0]).toLocaleDateString('en-US', {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        }),
        finalDate: new Date(bookingQuery.dates[1]).toLocaleDateString('en-US', {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        }),
        vaccinated: Boolean(bookingQuery.vacined),
        seller: bookingQuery.tips,
        startTime: bookingQuery.checkIn.toString()
    }
    console.log(bookingQueryMapper)

    //return postAuthReq(BOOKING_URL, bookingQueryMapper);
}