import {SET_LOGIN} from "./constants"
export const setLogin = payload => {
    return {
        type: SET_LOGIN,
        payload
    }
}