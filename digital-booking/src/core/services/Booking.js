import { formStateMapper } from "../../utils/formStateMapper";
import { getReqAuth, postAuthReq } from "./axios";
import { baseUrl } from "./baseUrl";

const BOOKING_URL = `${baseUrl}/booking`;

export async function bookingProduct(bookingForm) {
    const bookingQuery = formStateMapper(bookingForm);
    const bookingQueryMapper = {
        userId: bookingQuery.userId,
        productId: bookingQuery.productId,
        initial_date: new Date(bookingQuery.dates[0]).toLocaleDateString('en-US', {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        }),
        final_date: new Date(bookingQuery.dates[1]).toLocaleDateString('en-US', {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        }),
        vaccinated: bookingQuery.vacined === 'No' ? false : true,
        seller: bookingQuery.tips,
        startTime: bookingQuery.checkIn.toString()
    }

    return postAuthReq(BOOKING_URL, bookingQueryMapper);
}

export async function getBookingsByUserId(userId) {
    return getReqAuth(`${BOOKING_URL}/user/${userId}`);
}

export async function getAllBookings() {
    return getReqAuth(BOOKING_URL);
}
