import { takeEvery, put, call } from 'redux-saga/effects'
import fetch from 'isomorphic-fetch'

import { REQUEST_REGISTER_USER } from '../actions'
import { setLogin } from '../actions'

const api = (process.env.NODE_ENV === 'production') ?
    'https://localhost:8080' : 'http://localhost:3001';




function postRegisterUser(action){

    const {username, password} = action

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
    ).then((res) => {
        return res.json()
    })
}

function* checkLoginUser(action){
    console.log(action)
}


function* registerUser(action) {
    try{
        const data = yield call(postRegisterUser, action)
        yield put( setLogin(data.username, data.token) )
    } catch (e) {
        return;
    }
}



// Watching
export function* watchRegisterUser() {
    yield takeEvery(REQUEST_REGISTER_USER, registerUser)
}

export function* watchSetLoginUser() {
    yield takeEvery("CHECK_LOGIN", checkLoginUser)
}