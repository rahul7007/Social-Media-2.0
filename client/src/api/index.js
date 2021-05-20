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
export const deleteExperienceApi = (tempToken, exp_id) => api.delete(`/profile/experience/${tempToken}/${exp_id}`)
export const deleteEducationApi = (tempToken, edu_id) => api.delete(`/profile/education/${tempToken}/${edu_id}`)

const apis = {
    register,
    login,
    getLoggedInUser,
    getCurrentProfile,
    createNewProfile,
    addExperienceApi,
    addEducationApi,
    deleteExperienceApi,
    deleteEducationApi
}

export default apis