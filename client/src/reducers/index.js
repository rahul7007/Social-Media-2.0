import { combineReducers } from 'redux'

import PostReducer from './AlertReducer'
import AuthReducer from './AuthReducer'
import ProfileReducer from './ProfileReducer'
import PostReducerNew from './PostReducerNew'


const rootReducer = combineReducers({
    PostReducer,
    AuthReducer,
    ProfileReducer,
    PostReducerNew
})

export default rootReducer