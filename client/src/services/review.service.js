/**
 * Api calls related to reviews
 */
import axios from 'axios'
import authHeader from "./auth-header";

// const API_URL = "http://localhost:8080/api/";
const API_URL = "https://tadoo-backend-p9hgk.ondigitalocean.app/api/"

export const createReview = (review) => {
    return axios.post(
        `${API_URL}reviews`,
        review,
        { headers: authHeader() })
}

export const updateReview = (review) => {
    return axios.put(`${API_URL}reviews`,
        { ...review },
        { headers: authHeader() })
}

export default {
    createReview,
    updateReview,
}