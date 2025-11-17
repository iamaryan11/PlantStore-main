import axios from "axios"

const axiosClient =  axios.create({
    baseURL: 'https://plantstore-backend-oj7s.onrender.com/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});


export default axiosClient;

