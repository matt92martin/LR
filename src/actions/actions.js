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
    );
}


export function postRegisterUser(username, password) {
    return function (dispatch) {
        return thunkRegisterUser(username, password).then(
            resp  => resp.json()
        ).then(
            user => console.log(user)
        ).catch(
            err => { throw new Error(err) }
        )
    }
}
