import axios from 'axios';
import TokenService from "./TokenService";
//this service is use for send api request to endpoint with Bearer token
const ApiService = {
    init() {
        axios.defaults.baseURL = "http://127.0.0.1:8000/api/";
        axios.defaults.headers.common["Authorization"] = `Bearer ${TokenService.getToken()}`;
    },

    get(resource, params) {
        return axios.get(`${resource}`, params);
    },

    post(resource, params) {
        return axios.post(`${resource}`, params);
    },

    update(resource, params) {
        return axios.put(`${resource}`, params);
    },

    delete(resource) {
        return axios.delete(resource);
    },
};

export default ApiService;