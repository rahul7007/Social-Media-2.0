import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
})


export const register = (payload, config) => api.post(`/register`, payload, config)
export const login = payload => api.post(`/login`, payload)
export const getLoggedInUser = (tempToken) => api.get(`/login/${tempToken}`)


export const getCurrentProfile = (tempToken) => api.get(`/profile/me/${tempToken}`)

export const createNewProfile = (payload, tempToken) => api.post(`/profile/${tempToken}`, payload)
export const addExperienceApi = (payload, tempToken) => api.put(`/profile/experience/${tempToken}`, payload)
export const addEducationApi = (payload, tempToken) => api.put(`/profile/education/${tempToken}`, payload)

const apis = {
    register,
    login,
    getLoggedInUser,
    getCurrentProfile,
    createNewProfile,
    addExperienceApi,
    addEducationApi
}

export default apis