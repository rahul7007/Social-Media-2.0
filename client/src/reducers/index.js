import { combineReducers } from 'redux'

import PostReducer from './AlertReducer'
import AuthReducer from './AuthReducer'


const rootReducer = combineReducers({
    PostReducer,
    AuthReducer
})

export default rootReducer