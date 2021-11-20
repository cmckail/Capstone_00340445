/**
 * api calls related to products
 */
import axios from "axios";
import authHeader from "./auth-header";
import imageService from "./image.service";

// const API_URL = "http://localhost:8080/api/";
const API_URL = "https://tadoo-backend-p9hgk.ondigitalocean.app/api/"

export const getProduct = (id) => {
    return axios.get(`${API_URL}products/${id}`, { headers: authHeader() })
        .then((p) => p.data)
        .catch((err) => {
            console.error('Error', err);
            return err;
        })
}

export const searchProducts = (query) => {
    return axios.get(`${API_URL}search/products?${query}`, { headers: authHeader() })
        .then((p) => p.data)
        .catch((err) => {
            console.error('Error', err);
            return err;
        })
}

export const deleteProduct = (id) => {
    return axios.delete(`${API_URL}products/${id}`, { headers: authHeader() })
}

export const updateProductInfo = async (productData) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (productData.selectedFile) {
        const { data } = await imageService.uploadPhoto(productData.selectedFile)
            .catch((err) => {
                console.error('Error:', err);
                return err;
            });
        productData = { ...productData, image: JSON.stringify(data.data, null, 4) }
    }
    delete productData['selectedFile']
    return axios.put(`${API_URL}products/`, { ...productData, username: user.username }, { headers: authHeader() })
}

export const createProduct = async (productData) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (productData.selectedFile) {
        const { data } = await imageService.uploadPhoto(productData.selectedFile)
            .catch((error) => {
                console.error('Error:', error);
                return error
            });
        productData = { ...productData, image: JSON.stringify(data.data, null, 4) }
    }
    delete productData['selectedFile']
    return axios.post(`${API_URL}products/`, { ...productData, merchant_id: user.id }, { headers: authHeader() })
}

export const createCheckoutSession = async (product) => {
    return axios.post(`${API_URL}create-checkout-session/`, product, { headers: authHeader() })
        .then((p) => p.data)
        .catch((err) => {
            console.error('Error', err);
            return err;
        })
}


export default {
    updateProductInfo,
    createProduct,
    deleteProduct,
    getProduct,
    searchProducts,
    createCheckoutSession,
};