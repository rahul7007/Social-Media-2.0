import { combineReducers } from 'redux'

import PostReducer from './AlertReducer'
import AuthReducer from './AuthReducer'
import ProfileReducer from './ProfileReducer'


const rootReducer = combineReducers({
    PostReducer,
    AuthReducer,
    ProfileReducer
})

export default rootReducer