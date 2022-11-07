import * as ActionTypes from './actionTypes';
import axios from 'axios'
const tokenKey = "jwtToken";

export function setAuthHeader(token) {
    //let token = sessionStorage.getItem(tokenKey);
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    else {
        delete axios.defaults.headers.common["Authorization"];
    }
}
export const Token = (state = {
    token: sessionStorage.getItem(tokenKey)==null ? undefined:sessionStorage.getItem(tokenKey)
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_TOKEN:
            //store JWT Token to browser session storage 
            //If you use localStorage instead of sessionStorage, then this w/   
            //persisted across tabs and new windows.
            //sessionStorage = persisted only in current tab
            let payload = action.payload;
            if(payload==="") payload=undefined;
            if(payload) {
                sessionStorage.setItem(tokenKey, payload);
            } else {
                sessionStorage.removeItem(tokenKey);
            }
            return { ...state, token: payload }

        default:
            return state;
    }
}