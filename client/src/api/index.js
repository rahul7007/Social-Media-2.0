import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
})


export const register = payload => api.post(`/register`, payload)
export const login = payload => api.post(`/login`, payload)


const apis = {
    register,
    login
}

export default apis