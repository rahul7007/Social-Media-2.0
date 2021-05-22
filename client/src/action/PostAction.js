import { alert } from './AlertAction'
import * as api from '../api/index'
import { GET_POSTS, POST_ERROR, UPDATE_LIKES, DELETE_POST } from './types'

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

// Like a post by id
export const addLike = (postId) => async dispatch => {
    try {
        const tempToken = localStorage.getItem("token")

        const { data } = await api.likePostsByIdApi(tempToken, postId)

        dispatch({ type: UPDATE_LIKES, payload: { postId, likes: data } })

    } catch (err) {
        console.log(err)
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Like a post by id
export const removeLike = (postId) => async dispatch => {
    try {
        const tempToken = localStorage.getItem("token")

        const { data } = await api.unlikePostsByIdApi(tempToken, postId)

        dispatch({ type: UPDATE_LIKES, payload: { postId, likes: data } })

    } catch (err) {
        console.log(err)
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// delete post by id
export const delPostById = (postId) => async dispatch => {
    try {
        const tempToken = localStorage.getItem("token")

        const { data } = await api.delPostsByIdApi(tempToken, postId)

        dispatch({ type: DELETE_POST, payload: postId })

        dispatch(alert('Post removed', 'success'))

    } catch (err) {
        console.log(err)
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}