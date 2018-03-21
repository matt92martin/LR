import fetch from 'isomorphic-fetch'


const api = (process.env.NODE_ENV === 'production') ?
    'https://localhost:8080' : 'http://localhost:3001';

// PLACE HOLDER ACTION TYPES AND ACTION CREATORS

export const PH_ACTION = 'PH_ACTION'
export function actionSomething(text) {
    return {
        type: PH_ACTION,
        text
    }
}

export const INCREMENT_ASYNC = 'INCREMENT_ASYNC'
export function increment() {
    return {
        type: INCREMENT_ASYNC
    }
}

export const REQUEST_REGISTER_USER = 'REQUEST_REGISTER_USER'
export function requestRegisterUser(username, password) {
    return {
        type: REQUEST_REGISTER_USER,
        username,
        password
    }
}

export const SET_LOGIN = "SET_LOGIN"
export function setLogin(username, token) {
    return {
        type: SET_LOGIN,
        username,
        token
    }
}


function thunkRegisterUser(username, password){

    return fetch(`${api}/api/v1/register`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        }
    )
//     .then((res) => {
//         return res.json()
//     })
}


export function postRegisterUser(username, password) {
    console.log('postRegisterUser');
    return function (dispatch) {
        return thunkRegisterUser().then(
            user => console.log( user ),
            error => console.log( error )
        )
    }
}
