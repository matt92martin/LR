import {
    PH_ACTION,
    SET_LOGIN
} from '../actions/actions.js'


export function somethings(state = [], action) {

    switch(action.type){

        case PH_ACTION:
            return [
                ...state,
                {
                    text: action.text
                }
            ]

        default:
            return state
    }

}


export function setLogin(state = {}, action) {

    switch(action.type){

        case SET_LOGIN:
            return {
                ...state,
                username: action.username,
                token: action.token
            }

        default:
            return state
    }
}
