/**
 * Description: Actions of the user data
 * Date: 1/28/2019
 */

import { AsyncStorage } from 'react-native';

export const SET_USER = '[AUTH] SET USER';

export function setUser(data) {
    AsyncStorage.setItem('loginType', data.loginType);
    AsyncStorage.setItem('accessToken', data.accessToken);
    AsyncStorage.setItem('consumerId', data.consumerId.toString());
    AsyncStorage.setItem('salonId', data.salonId.toString());
    AsyncStorage.setItem('salonName', data.salonName);
    AsyncStorage.setItem('hairdresserId', data.hairdresserId.toString());
    AsyncStorage.setItem('hairdresserName', data.hairdresserName);
    AsyncStorage.setItem('email', data.email);
    AsyncStorage.setItem('name', data.name);
    
    return (dispatch) => {
        dispatch({
            type            : SET_USER,
            loginType       : data.loginType,
            accessToken     : data.accessToken,
            consumerId      : data.consumerId,
            salonId         : data.salonId,
            salonName       : data.salonName,
            hairdresserId   : data.hairdresserId,
            hairdresserName : data.hairdresserName,
            email           : data.email,
            name            : data.name
        })
    }
}

export const GET_USER = '[AUTH] GET USER';

export function getUser() {
    return async (dispatch) => {
        dispatch({
            type            : GET_USER,
            loginType       : await AsyncStorage.getItem('loginType'),
            accessToken     : await AsyncStorage.getItem('accessToken'),
            consumerId      : await AsyncStorage.getItem('consumerId'),
            salonId         : await AsyncStorage.getItem('salonId'),
            salonName       : await AsyncStorage.getItem('salonName'),
            hairdresserId   : await AsyncStorage.getItem('hairdresserId'),
            hairdresserName : await AsyncStorage.getItem('hairdresserName'),
            email           : await AsyncStorage.getItem('email'),
            name            : await AsyncStorage.getItem('name')
        })
    }
}

export const UPDATE_USER = '[AUTH] UPDATE USER';

export function updateUser(data) {
    console.warn('update user action: ', data)
    Object.keys(data).map(key => {
        AsyncStorage.setItem(key, data[key])
    })
    return (dispatch) => {
        dispatch({
            type: UPDATE_USER,
            data
        })
    }
}

export const CLEAR_USER = '[AUTH] CLEAR USER';

export function clearUser() {
    AsyncStorage.clear();
    return (dispatch) => {
        dispatch({
            type: CLEAR_USER
        })
    }
}