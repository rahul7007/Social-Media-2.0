import { alert } from './AlertAction'
import * as api from '../api/index'
import { GET_POSTS, POST_ERROR } from './types'

//Get posts
export const getAllPosts = () => async dispatch => {
    try {
        const tempToken = localStorage.getItem("token")

        const { data } = await api.getAllPostsApi(tempToken)

        dispatch({ type: GET_POSTS, payload: data })

    } catch (err) {
        console.log(err)
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}