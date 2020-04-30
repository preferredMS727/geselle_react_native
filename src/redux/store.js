/**
 *  Description: Redux store
 *  Date: 4/8/2019
 */

import { createStore, applyMiddleware } from "redux";
import ReduxThunk from 'redux-thunk';

import RootReducer from "./reducers";

export default createStore(
    RootReducer,
    applyMiddleware(
        ReduxThunk
    )  
);