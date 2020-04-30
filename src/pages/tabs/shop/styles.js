/**
 * Description: Login page Styles
 * Date: 1/16/2019
 */

import { StyleSheet, Dimensions, StatusBar } from 'react-native';

const { width, height }  = Dimensions.get('window');

export default styles = StyleSheet.create({
    container: {
        height: '100%'
    },
    toolbar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#485155'
    },
    title: {
        fontSize: 19,
        color: '#fff'   
    },
    icon: {
        color: '#fff'
    }
})