import { SET_LOGIN, SET_USERNAME } from "./constants"
export const setLogin = payload => {
    return {
        type: SET_LOGIN,
        payload
    }
}

export const setUsername = payload => {
    return {
        type: SET_USERNAME,
        payload
    }
}