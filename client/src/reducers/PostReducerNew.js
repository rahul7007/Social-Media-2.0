import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST,
    GET_SINGLE_POST,
    ADD_COMMENT,
    REMOVE_COMMENT
} from '../action/types'

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

        case ADD_POST:
            return {
                ...state,
                posts: [payload, ...state.posts],
                postLoading: false
            };

        case GET_SINGLE_POST:
            return {
                ...state,
                post: payload,
                postLoading: false
            }

        case ADD_COMMENT:
            return {
                ...state,
                post: { ...state.post, comments: payload },
                postLoading: false
            }

        case REMOVE_COMMENT:
            return {
                ...state,
                post: {
                    ...state.post,
                    comments: state.post.comments.filter(val => val._id === payload)
                },
                postLoading: false
            }

        default: return state
    }
}

export default PostReducerNew