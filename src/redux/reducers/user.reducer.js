/**
 *  Description: Reducer of the user data
 *  Date: 1/28/2019
 */

import * as Actions from './../actions';
const initialState = {
    loginType       : null,
    accessToken     : null,
    consumerId      : null,
    salonId         : null,
    salonName       : null,
    hairdresserId   : null,
    hairdresserName : null,
    email           : null,
    name            : null
}

const user = function (state = initialState, action) {
    switch ( action.type ) {
        case Actions.SET_USER:
        case Actions.GET_USER:
            return {
                ...state,
                loginType       : action.loginType,
                accessToken     : action.accessToken,
                consumerId      : action.consumerId,
                salonId         : action.salonId,
                salonName       : action.salonName,
                hairdresserId   : action.hairdresserId,
                hairdresserName : action.hairdresserName,
                email           : action.email,
                name            : action.name
            };            
        case Actions.UPDATE_USER:
            return {
                ...state,
                ...action.data
            };       
        case Actions.CLEAR_USER:
            return {
                loginType       : null,
                accessToken     : null,
                consumerId      : null,
                salonId         : null,
                salonName       : null,
                hairdresserId   : null,
                hairdresserName : null,
                email           : null,
                name            : null
            };
        default:
            return state;
    }
};

export default user;