import { createStore,applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import userInfoReducer from './Reducers/userInfoReducer';
import friendsReducer from './Reducers/friendsReducer';
import groupReducer from './Reducers/groupReducer';

const redux = require('redux');

const combineReducers = redux.combineReducers;

const rootReducer = combineReducers({
    userInfoReducer,
    friendsReducer,
    groupReducer 
});

let store = createStore(rootReducer, applyMiddleware(thunk));


export default store;