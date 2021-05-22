import { GET_POSTS, POST_ERROR, UPDATE_LIKES, DELETE_POST } from '../action/types'

const initialState = {
    posts: [],
    post: null,
    postLoading: true,
    postError: {}
}

const PostReducerNew = (state = initialState, action) => {

    const { type, payload } = action

    switch (type) {

        case GET_POSTS:
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

        case UPDATE_LIKES:
            return {

                ...state,
                posts: state.posts.map((post) =>
                    post._id === payload.postId ? { ...post, likes: payload.likes } : post
                ),
                postLoading: false
            };

        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter((post) => post._id !== payload), //this time payload is the postId
                postLoading: false
            };

        default: return state
    }
}

export default PostReducerNew