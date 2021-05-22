import { GET_POSTS, POST_ERROR } from '../action/types'

const initialState = {
    posts: [],
    post: null,
    postLoading: true,
    postError: {}
}

const PostReducerNew = (state = initialState, action) => {

    const { type, payload } = action

    switch (type) {

        case 'GET_POSTS':
            return {
                ...state,
                posts: payload,
                postLoading: false
            }

        case POST_ERROR:
            return {
                ...state,
                postError: payload,
                postLoading: false
            }

        default: return state
    }
}

export default PostReducerNew