/**
 * Api calls related to appointments
 */
import axios from 'axios'
import authHeader from "./auth-header";

// const API_URL = "http://localhost:8080/api/";
const API_URL = "https://tadoo-backend-p9hgk.ondigitalocean.app/api/"

export const getUserAppointments = () => {
    return axios.get(
        `${API_URL}appointments/user`,
        { headers: authHeader() })
        .then((data) => data.data);
}

export const getMerchantAppointments = () => {
    return axios.get(
        `${API_URL}appointments/merchant`,
        { headers: authHeader() })
        .then((data) => data.data);
}

export const bookAppointment = (status, id) => {
    return axios.post(
        `${API_URL}appointments/book`,
        { booked: status, id },
        { headers: authHeader() })
        .then((data) => data.data)
}
export default {
    getUserAppointments,
    getMerchantAppointments,
    bookAppointment
}