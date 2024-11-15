import axios from "axios";
/////////// change base url here ///////////////////
// const BASE_URL = 'https://online-skill-exchange-platform.onrender.com/'
const BASE_URL = 'http://localhost:5000/'
////////////////////////////////////////////////////
const axiosurl = axios.defaults.baseURL = BASE_URL
export default axiosurl;