const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null, // when we make req to reg/login, and if got the success response, we'll make it true
    loading: true, //once we make the req and get the data/response, we'll make it false
    user: null
}


const AuthReducer = (authState = initialState, action) => {
    switch (action.type) {
        case "REGISTER_SUCCESS":
            console.log("Payload in red", action.payload);
            localStorage.setItem("token", action.payload)
            return {
                ...authState,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            }

        case "REGISTER_FAIL":
            localStorage.removeItem("token")
            return {
                ...authState,
                token: null,
                isAuthenticated: false,
                loading: false
            }

        default: return authState
    }
}

export default AuthReducer