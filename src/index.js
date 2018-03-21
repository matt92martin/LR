import React from 'react'
import { render } from 'react-dom'
import { compose, createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { autoRehydrate, persistStore } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import { reducer as formReducer } from 'redux-form'
import * as reducers from './reducers/reducers.js'
import rootSaga from "./actions/sagas"

import App from './app'


const rootReducer = combineReducers({
    ...reducers,
    // form: formReducer
})
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
        rootReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        compose(
            applyMiddleware(thunk),
            // autoRehydrate()
        )
    )
// persistStore(store)
// sagaMiddleware.run(rootSaga)

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)