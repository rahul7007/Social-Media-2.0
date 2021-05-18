import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
})


export const register = (payload, config) => api.post(`/register`, payload, config)
export const login = payload => api.post(`/login`, payload)
export const getLoggedInUser = (tempToken) => api.get(`/login/${tempToken}`)


const apis = {
    register,
    login
}

export default apis