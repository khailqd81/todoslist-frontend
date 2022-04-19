import { SET_LOGIN, SET_USERNAME } from "./constants"

export const initialState = {
    isLogin: false,
    username: "username"
}
const reducer = (state, action) => {
    switch (action.type) {
        case SET_LOGIN:
            return {
                ...state,
                isLogin: action.payload
            }
        case SET_USERNAME:
            return {
                ...state,
                username: action.payload
            }
        default:
            return state
    }
}

export default reducer;
