import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
})


export const register = (payload, config) => api.post(`/register`, payload, config)
export const login = payload => api.post(`/login`, payload)
export const getLoggedInUser = (tempToken) => api.get(`/login/${tempToken}`)


export const getCurrentProfile = (tempToken) => api.get(`/profile/me/${tempToken}`)

export const createNewProfile = (payload, tempToken) => api.post(`/profile/${tempToken}`, payload)


const apis = {
    register,
    login,
    getLoggedInUser,
    getCurrentProfile,
    createNewProfile
}

export default apis