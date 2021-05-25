import { alert } from './AlertAction'
import * as api from '../api/index'
import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST,
    GET_SINGLE_POST,
    ADD_COMMENT,
    REMOVE_COMMENT
} from './types'

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

// add a post
export const addPost = (formData) => async dispatch => {
    try {
        const tempToken = localStorage.getItem("token")

        const { data } = await api.addPostApi(tempToken, formData)

        dispatch({ type: ADD_POST, payload: data })

        dispatch(alert('Post created', 'success'))

    } catch (err) {
        console.log(err)
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//Get single post
export const getSinglePost = (postId) => async dispatch => {
    try {
        const tempToken = localStorage.getItem("token")

        const { data } = await api.getPostByIdApi(tempToken, postId)

        dispatch({ type: GET_SINGLE_POST, payload: data })

    } catch (err) {
        console.log(err)
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}


//add comment to a post
export const addComment = (postId, formData) => async dispatch => {
    try {
        const tempToken = localStorage.getItem("token")

        const { data } = await api.addCommentApi(tempToken, postId, formData)

        dispatch({ type: ADD_COMMENT, payload: data })

    } catch (err) {
        console.log(err)
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}


//delete comment
export const delComment = (postId, commentId) => async dispatch => {
    try {
        const tempToken = localStorage.getItem("token")

        await api.delCommentApi(tempToken, postId, commentId)

        dispatch({
            type: REMOVE_COMMENT, payload: commentId
        })

    } catch (err) {
        console.log(err)
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}