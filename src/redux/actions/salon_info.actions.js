/**
 * Description: Actions of the salon info
 * Date: 4/13/2019
 */

import * as Utils from './../../utils';

export const SALONINFO_REQUEST   = '[SALONINFO] REQUEST';
export const SALONINFO_SUCCESS   = '[SALONINFO] SUCCESS';
export const SALONINFO_FAILED    = '[SALONINFO] FAILED';

export function getSaloninfo() {
    const request = Utils.xapi().post('consumer/saloninfo');

    return (dispatch) => {
        dispatch({
            type: SALONINFO_REQUEST
        })
        request.then((response) =>
            dispatch({
                type    : SALONINFO_SUCCESS,
                payload : response.data.Salon
            })
        ).catch((error) => {
            dispatch({
                type    : SALONINFO_FAILED,
                payload : error
            })
        });
    }        
}

export const CLEAR_SALONINFO    = '[SALONINFO] CLEAR';

export function clearSaloninfo() {

    return (dispatch) => {
        dispatch({
            type: CLEAR_SALONINFO
        })
    }        
}