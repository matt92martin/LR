import { all } from 'redux-saga/effects'
import { watchRegisterUser } from './auth'

export default function* rootSaga() {
    yield all([
        watchRegisterUser()
    ])
}