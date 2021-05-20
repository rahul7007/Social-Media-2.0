const initialState = {
    profile: null,
    profiles: [], //the profile listing page, where we have the list of developers
    repos: [], //for fetch the github repos
    profileLoading: true,
    error: {} //for any error in the request
}


const ProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_PROFILE":
        case "UPDATE_PROFILE":
            return {
                ...state,
                profile: action.payload,
                profileLoading: false
            }

        case "CLEAR_PROFILE":
            return {
                ...state,
                profile: null,
                repos: [],
                profileLoading: false
            }
        default: return state
    }
}

export default ProfileReducer