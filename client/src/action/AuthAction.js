import * as api from '../api/index'
import { alert } from '../action/AlertAction'

export const registerMe = ({ name, email, password }) => async (dispatch) => {

    try {
        const { data } = await api.register({ name, email, password }) //fetch the api
        dispatch({ type: "REGISTER_SUCCESS", payload: data.token })
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
        dispatch({ type: "REGISTER_FAIL" })
    }

}