const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null, // when we make req to reg/login, and if got the success response, we'll make it true
    loading: true, //once we make the req and get the data/response, we'll make it false
    user: null
}


const AuthReducer = (authState = initialState, action) => {
    switch (action.type) {
        case "REGISTER_SUCCESS":
        case "LOGIN_SUCCESS":
            console.log("Payload in red", action.payload);
            localStorage.setItem("token", action.payload)
            return {
                ...authState,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            }

        case "REGISTER_FAIL":
        case "AUTH_ERROR":
        case "LOGIN_FAIL":
        case "LOGOUT":
            localStorage.removeItem("token")
            return {
                ...authState,
                token: null,
                isAuthenticated: false,
                loading: false
            }

        case "USER_LOADED":
            return {
                ...authState,
                isAuthenticated: true,
                loading: false,
                user: action.payload // this will be all the user data except password as .select(-password) in backend
            }

        default: return authState
    }
}

//handle the whole process of taking token that we have stored, sending it to the backend for validation and loading the user
//and we want that to happen every single time the main app component is loaded

export default AuthReducer