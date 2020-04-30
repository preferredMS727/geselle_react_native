/**
 *  Description: Root of the reducer
 *  Date: 4/8/2019
 */

import { combineReducers } from 'redux';

import user from './user.reducer';
import salon_info from './salon_info.reducer';

export default combineReducers({
    user,
    salon_info
});