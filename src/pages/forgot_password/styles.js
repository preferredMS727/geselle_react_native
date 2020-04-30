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
    logo_container: {
        width: '80%', 
        alignItems: 'center'
    },
    mt_10_p: {
        marginTop: 0.1 * height
    },
    logo: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        marginBottom: 16
    },
    form: {
        width: '80%',
        marginTop: 50,
    },
    button_active: {
        backgroundColor: '#88A177',
        marginBottom: 15
    }
})