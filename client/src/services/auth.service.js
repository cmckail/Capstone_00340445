/**
 * Api calls related to authorization
 */
import axios from "axios";
import imageService from "./image.service";
// const API_URL = "http://localhost:8080/api/auth/";
const API_URL = "https://tadoo-backend-p9hgk.ondigitalocean.app/api/auth/";

const register = async (userData) => {

  if (userData.selectedFile) {
    const { data } = await imageService.uploadPhoto(userData.selectedFile)
      .catch((error) => {

        if (error.response) {
          console.log('error response', error.response.data)
        }
      });
    userData = { ...userData, profile_picture: JSON.stringify(data.data, null, 4) }
  }
  delete userData['selectedFile']
  return axios.post(API_URL + "signup", { ...userData })
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    })
};

const authServices = {
  register,
  login
};
export default authServices
