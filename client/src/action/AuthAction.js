import * as api from '../api/index'
import { alert } from '../action/AlertAction'

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR
} from './types';
import setAuthToken from '../utils/setAuthToken'

// Load user
export const loadUser = () => async dispatch => {
    // we need to check to see if there's a token and if so,we'll put in global header, 
    if (localStorage.getItem("token")) {
        setAuthToken(localStorage.getItem("token"))
    }

    try {
        // console.log("CALLLLiiiinnnG");
        const tempToken = localStorage.getItem("token")
        const { data } = await api.getLoggedInUser(tempToken) //fetch the api
        dispatch({ type: USER_LOADED, payload: data })
        console.log("Data from api", data)
    } catch (err) {
        console.log(err.response)
        // dispatch({ type: AUTH_ERROR })
    }
}


// Register user
export const registerMe = ({ name, email, password }) => async (dispatch) => {

    //5 may
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ name, email, password })

    try {
        const { data } = await api.register(body, config) //fetch the api
        dispatch({ type: REGISTER_SUCCESS, payload: data.token })
        console.log(data.token)
    } catch (err) {
        // calling the alert action for showing any erreor
        // here error.response is the same array as response.data on success
        const errors = err.response.data.errors;

        // if there are errors, we'll loop through all the errors and dispatch alert
        if (errors) {
            errors.forEach(element => {
                dispatch(alert(element.msg, 'danger'))
            });
        }
        dispatch({ type: REGISTER_FAIL })
    }

}