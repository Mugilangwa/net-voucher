import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,// au URL yako
    //   baseURL: "http://127.0.0.1:8000/api/v1",
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})

export default axiosInstance
