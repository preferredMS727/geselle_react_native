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
    salon_item: {
        backgroundColor: '#faf8ee',
        padding: 8,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    salon_image: {
        width: 80, 
        height: 80, 
        borderRadius: 4
    },
    salon_info: {
        paddingLeft: 8, flex: 1
    },
    salon_name: {
        borderBottomColor: '#80A0AB',
        borderBottomWidth: 1
    },
    salon_address: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    address_container: {
        flex: 4, 
        paddingTop: 8
    },
    address_icon: {
        color: '#80A0AB', 
        fontSize: 20
    },
    font_12: {
        fontSize: 12
    },
    save_button: {
        marginLeft: 8, 
        backgroundColor: '#80A0AB', 
        borderRadius: 8, 
        paddingVertical: 8, 
        paddingHorizontal: 16
    },
    button_text: {
        textAlign: 'center', 
        color: '#fff', 
        fontWeight: '500'
    },    
})