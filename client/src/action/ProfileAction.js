import * as api from '../api/index'
import { alert } from '../action/AlertAction'

// Get the current user's profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const tempToken = localStorage.getItem("token")
        console.log("tempToken", tempToken)
        const { data } = await api.getCurrentProfile(tempToken) //fetch the api
        dispatch({ type: 'GET_PROFILE', payload: data })
        console.log("Data from PROFILE api", data)
    } catch (err) {
        console.log(err.response)
        // dispatch({ type: AUTH_ERROR })
    }
}