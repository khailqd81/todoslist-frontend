import {SET_LOGIN} from "./constants"

export const initialState = {
    isLogin: false
}
const reducer = (state, action) => {
    switch(action.type){
        case SET_LOGIN:
            return {
                ...state,
                isLogin: action.payload
            }
        default:
            return state
    }
}

export default reducer;
