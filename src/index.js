import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import createLogger from 'redux-logger';
import index from './reducers/index';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import App from './App';
import thunk from 'redux-thunk';

const middlewares = [thunk];
if(process.env.NODE_ENV == 'development'){
    middlewares.push(createLogger())
}
const store = createStore(
    combineReducers({
        index
    }),
    compose(applyMiddleware(...middlewares), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

const Structure = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(<Structure />, document.getElementById('root'));
