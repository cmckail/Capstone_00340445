/**
 * Api calls related to users
 */
import axios from "axios";
import authHeader from "./auth-header";
import imageService from "./image.service";

// const API_URL = "http://localhost:8080/api/";
const API_URL = "https://tadoo-backend-p9hgk.ondigitalocean.app/api/"

export const getUserInfo = async (username) => {
  const { data } = await axios.get(`${API_URL}user/${username}`, { headers: authHeader() })
    .catch((error) => {
      let errorP = {
        data: {
          message: 'Error Receiving user from server',
          error: error,

        }
      }
      return errorP
    })
  return data
}

export const updateUserInfo = async (userData) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (userData.selectedFile) {
    const { data } = await imageService.uploadPhoto(userData.selectedFile)
      .catch((error) => {
        console.error('Error:', error);
        return error
      });
    userData = { ...userData, profile_picture: JSON.stringify(data.data, null, 4) }
  }
  delete userData['selectedFile']
  return axios.put(`${API_URL}user`, { ...userData, username: user.username }, { headers: authHeader() })
}

export default {
  getUserInfo,
  updateUserInfo,
};