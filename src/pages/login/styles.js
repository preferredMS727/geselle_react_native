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
        position: 'absolute',
        left: 8,
        top: 15
    },
    back_icon: {
        fontSize: 48,
        color: '#7da8ae'
    },
    logo: {
        width: 0.6 * width,
        height: 0.1 * height,
        marginBottom: 8
    },
    form: {
        width: '80%',
        marginTop: 50,
    },
    divider_text: {
        fontSize: 16, 
        marginHorizontal: 8
    },
    social_container: {
        width: '80%', 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    social_button: {
        width: 50, 
        height: 50, 
        resizeMode: 'contain'
    },
    link_container: {
        width: '80%', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 16
    },
    link_text: {
        fontSize: 16
    }
    
})