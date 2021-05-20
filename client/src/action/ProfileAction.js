import * as api from '../api/index'
import { alert } from '../action/AlertAction'

// Get the current user's profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const tempToken = localStorage.getItem("token")
        // console.log("tempToken", tempToken)
        const { data } = await api.getCurrentProfile(tempToken) //fetch the api
        dispatch({ type: 'GET_PROFILE', payload: data })
        // console.log("Data from PROFILE api", data)
    } catch (err) {
        console.log(err.response)
        // dispatch({ type: AUTH_ERROR })
    }
}

// Create/update profile
export const createProfile = (formData, history, edit) => async dispatch => {
    try {
        const tempToken = localStorage.getItem("token")
        // console.log("1", formData)
        // console.log("2", history)
        const { data } = await api.createNewProfile(formData, tempToken) //create/update profile
        // console.log("This is you", data)


        //after creating get the profile data as well
        dispatch({ type: 'GET_PROFILE', payload: data })

        //show alert based on create/edit
        dispatch(alert(edit ? 'Profile Updated' : 'Profile Created', 'success'))

        //redirect if created it, otherwise don't redirect
        if (!edit) {
            console.log('history is calling')
            history.push('/dashboard')  //we need to use props for this in createProfile component
        }
    } catch (err) {
        console.log(err)
    }
}


// add experience
export const addExperience = (formData, history) => async dispatch => {
    try {
        const tempToken = localStorage.getItem("token")
        // console.log("1", formData)
        const { data } = await api.addExperienceApi(formData, tempToken) //create/update profile


        //after creating get the profile data as well
        dispatch({ type: 'UPDATE_PROFILE', payload: data })

        //show alert based on create/edit
        dispatch(alert('Experience Added', 'success'))

        history.push('/dashboard')  //we need to use props for this in createProfile component

    } catch (err) {
        console.log(err)
    }
}

//Add education
export const addEducation = (formData, history) => async dispatch => {
    try {
        const tempToken = localStorage.getItem("token")
        // console.log("1", formData)
        const { data } = await api.addEducationApi(formData, tempToken) //create/update profile


        //after creating get the profile data as well
        dispatch({ type: 'UPDATE_PROFILE', payload: data })

        //show alert based on create/edit
        dispatch(alert('Education Added', 'success'))

        history.push('/dashboard')  //we need to use props for this in createProfile component

    } catch (err) {
        console.log(err)
    }
}

// Delete Experience

export const deleteExperience = (exp_id) => async dispatch => {
    try {
        const tempToken = localStorage.getItem("token")

        const { data } = await api.deleteExperienceApi(tempToken, exp_id) //create/update profile


        //after creating get the profile data as well
        dispatch({ type: 'UPDATE_PROFILE', payload: data })

        //show alert based on create/edit
        dispatch(alert('Experience removed', 'success'))

    } catch (err) {
        console.log(err)
    }
}

// Delete Education

export const deleteEducation = (edu_id) => async dispatch => {
    try {
        const tempToken = localStorage.getItem("token")

        const { data } = await api.deleteEducationApi(tempToken, edu_id) //create/update profile


        //after creating get the profile data as well
        dispatch({ type: 'UPDATE_PROFILE', payload: data })

        //show alert based on create/edit
        dispatch(alert('Education removed', 'success'))

    } catch (err) {
        console.log(err)
    }
}