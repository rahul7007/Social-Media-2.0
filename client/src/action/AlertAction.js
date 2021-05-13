import { v4 as uuidv4 } from 'uuid';

export const alert = (msg, alertType) => async (dispatch) => {
    const id = uuidv4();
    // msg: e.g. Incorrect password
    // alertType: danger, success etc.

    dispatch({ type: "SET_ALERT", payload: { msg, alertType, id } })

    setTimeout(() => {
        dispatch({ type: "REMOVE_ALERT", payload: id })
    }, 3000)
}