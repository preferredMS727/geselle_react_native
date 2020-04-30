/**
 * Description: Login page Styles
 * Date: 1/16/2019
 */

import { StyleSheet, Dimensions, StatusBar } from 'react-native';

const { width, height }  = Dimensions.get('window');

export default styles = StyleSheet.create({
    header: {
        justifyContent: 'center', 
        alignItems: 'center', 
        paddingTop: 32, 
        marginHorizontal: 16
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    back_icon: {
        fontSize: 24,
        fontWeight: '600',
        color: '#7da8ae'
    },
    font_18: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18
    },
    search: {
        borderRadius: 8, 
        marginTop: 32, 
        backgroundColor: '#E6ECEE'
    },
    search_button: {
        color: '#80A0AB'
    },
    divider: {
        borderTopColor: '#80A0AB', 
        borderTopWidth: 1, 
        marginVertical: 8
    },
    mx_16: {
        marginHorizontal: 16,
        height: height - 200
    },
    list: {
        backgroundColor: '#faf8ee',
        padding: 8,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    avatar: {
        width: 48, 
        height: 48, 
        borderRadius: 24,
        borderColor: '#80A0AB',
        borderWidth: 1
    },
    name: {
        textAlign: 'left',
        paddingLeft: 8,
        fontSize: 20,
        flex: 1
    },
    save_button: {
        marginLeft: 8, 
        backgroundColor: '#80A0AB', 
        borderRadius: 8, 
        paddingVertical: 4, 
        paddingHorizontal: 16
    },
    button_text: {
        textAlign: 'center', 
        color: '#fff', 
        fontWeight: '500'
    },
})