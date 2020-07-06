import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers';
import thunkMiddleware from "redux-thunk";

export function configureStore(preloadedState) {
    return createStore(rootReducer, preloadedState, applyMiddleware(thunkMiddleware))
}