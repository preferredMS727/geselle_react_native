/**
 * Description: Reducer of the salon info
 * Date: 4/13/2019
 */

import * as Actions from './../actions';

const initialState = {
    loading : false,
    error   : '',
    info    : null
}

const salon_info = function (state = initialState, action) {
    switch ( action.type ) {
        case Actions.SALONINFO_REQUEST:
            return {
                ...state,
                loading : true,
                error   : ''
            };
            case Actions.SALONINFO_SUCCESS:
                return {
                    ...state,
                    loading : false,
                    info    : action.payload
                };
            case Actions.SALONINFO_FAILED:
                return {
                    ...state,
                    loading : false,
                    error   : action.payload
                };
            case Actions.CLEAR_SALONINFO:
                return {                    
                    loading : false,
                    error   : '',
                    info    : null
                };
        default:
            return state;
    }
};

export default salon_info;