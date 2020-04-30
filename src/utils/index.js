/**
 * Description: Axios Instance
 * Date: 4/9/2019
 */

import axios from 'axios';
import Toast from 'react-native-root-toast';

import store from './../redux/store';

// export const root = "https://dev.geselle-one.com";
// export const apiRoot = root + "/api/dev/";
export const root = "https://geselle-one.com";
export const apiRoot = root + "/api/v1/";

export const xapi = (optional) => {
    const token = store.getState().user.accessToken;
    
    let headers = null;
    if (token) {
        headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': optional
        }
    }

    let xapi = axios.create({
        baseURL: apiRoot,
        headers: headers
    });

    return xapi;
};

export const toast = (message) => {
    let toast = Toast.show(message, {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
    });

    return toast;
}