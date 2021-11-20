/**
 * Api calls related to transactions
 */
import axios from 'axios'
import authHeader from "./auth-header";

// const API_URL = "http://localhost:8080/api/";
const API_URL = "https://tadoo-backend-p9hgk.ondigitalocean.app/api/"

export const checkSessionResult = (session_id) => {
    return axios.post(
        `${API_URL}transactions/check_transaction`,
        { session_id: session_id },
        { headers: authHeader() })
        .then((data) => data.data);
}

export default {
    checkSessionResult
}