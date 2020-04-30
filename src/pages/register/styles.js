/**
 * Description: Login page Styles
 * Date: 1/16/2019
 */

import { StyleSheet, Dimensions, StatusBar, Platform } from 'react-native';

const { width, height }  = Dimensions.get('window');

export default styles = StyleSheet.create({
    bg_container: {
        width: '100%',
        minHeight: Platform.OS === 'ios' ? height : height - StatusBar.currentHeight,
        alignItems: 'center'
    },
    back: {
        alignSelf: 'flex-start', 
        marginTop: 15, 
        marginLeft: 8
    },
    back_icon: {
        fontSize: 48,
        color: '#7da8ae'
    },
    form: {
        width: '80%',
    },
    item: {
        borderColor: '#7da8ae', 
        borderWidth: 1, 
        borderRadius: 8
    },
    divider_text: {
        fontSize: 18,
        fontWeight: '600', 
        marginHorizontal: 8
    },
    privacy: {
        flexDirection: 'row', 
        marginTop: 25, 
        alignItems: 'center'
    },
    checked_container: {
        width: 24,
        height: 24,
        borderRadius: 4, 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: '#80A0AB',
        marginRight: 8
    },
    unchecked_container: {
        width: 24,
        height: 24,
        borderColor: '#80A0AB',
        borderWidth: 1,
        borderRadius: 4, 
        alignItems: 'center', 
        justifyContent: 'center',
        marginRight: 8
    },
    check_icon: {
        fontSize: 18, 
        color: '#fff'
    }
})