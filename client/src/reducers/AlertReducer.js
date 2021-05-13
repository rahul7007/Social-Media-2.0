const PostReducer = (postState = [], action) => {
    switch (action.type) {
        case "SET_ALERT": return [...postState, action.payload] //action.payload is coming from actions>PostActions
        case "REMOVE_ALERT": return postState.filter((alert) => alert.id !== action.payload)
        // case "SET_ALERT": console.log("1 :", postState, "2 :", action.payload, "3", [...postState, action.payload])
        default: return postState
    }
}

export default PostReducer