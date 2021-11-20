/**
 * Handles the upload of images
 * 
 * this services is called by a lot of other services to upload image and store the json
 */
import axios from "axios"

const API_URL = "https://api.imgbb.com/1/upload?key=15d70c0c49ab3173c703b923def2f200"


const uploadPhoto = async (selectedFile) => {

    let body = new FormData()
    body.set('key', '15d70c0c49ab3173c703b923def2f200')
    body.append('image', selectedFile)

    return axios.post('https://api.imgbb.com/1/upload', body)

};

export default {
    uploadPhoto
}
