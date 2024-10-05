import axios from "axios";
/////////// change base url here ///////////////////
const BASE_URL = 'https://online-skill-exchange-platform.onrender.com/api/v1'
////////////////////////////////////////////////////
axios.defaults.baseURL = BASE_URL
export default axios;