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
export const deleteAccountApi = (tempToken) => api.delete(`/profile/${tempToken}`)

// get all profiles
export const getAllProfilesApi = () => api.get(`/profile/`)
export const getProfileByIdApi = (user_id) => api.get(`/profile/user/${user_id}`)
export const getGithubReposApi = (user_name) => api.get(`/profile/github/${user_name}`)


// Posts
export const getAllPostsApi = (tempToken) => api.get(`/getAllPosts/${tempToken}`)
export const likePostsByIdApi = (tempToken, postId) => api.put(`/posts/like/${tempToken}/${postId}`)
export const unlikePostsByIdApi = (tempToken, postId) => api.put(`/posts/unlike/${tempToken}/${postId}`)
export const delPostsByIdApi = (tempToken, postId) => api.delete(`/delPostById/${tempToken}/${postId}`)
export const addPostApi = (tempToken, payload) => api.post(`/posts/${tempToken}`, payload)

const apis = {
    register,
    login,
    getLoggedInUser,
    getCurrentProfile,
    createNewProfile,
    addExperienceApi,
    addEducationApi,
    deleteExperienceApi,
    deleteEducationApi,
    deleteAccountApi,
    getAllProfilesApi,
    getProfileByIdApi,
    getGithubReposApi,
    getAllPostsApi,
    likePostsByIdApi,
    unlikePostsByIdApi,
    delPostsByIdApi,
    addPostApi
}

export default apis