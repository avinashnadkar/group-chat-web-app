import { createStore,applyMiddleware } from 'redux'
import signupReducer from './Reducers/signupReducer';
import thunk from 'redux-thunk';
import userInfoReducer from './Reducers/userInfoReducer';
import loginReducer from './Reducers/loginInputHandler';

const redux = require('redux');

const combineReducers = redux.combineReducers;

const rootReducer = combineReducers({
    signupReducer,
    userInfoReducer,
    loginReducer
});

let store = createStore(rootReducer, applyMiddleware(thunk));


export default store;