import React from 'react'
import { render } from 'react-dom'
import { compose, createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import * as reducers from './reducers/reducers'
import {
    BrowserRouter,
    Route,
    Link,
    Redirect,
    Switch
} from 'react-router-dom'

import App from './app'


const rootReducer = combineReducers({
    ...reducers
});

const store = createStore(
        rootReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        compose(
            applyMiddleware(thunk)
        )
    );

render(
    <BrowserRouter>
        <Provider store={store}>
            <Switch>
                <Route path="/" exact component={App}/>
            </Switch>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);
