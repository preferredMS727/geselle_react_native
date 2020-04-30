/**
 * Description: Login page Styles
 * Date: 1/16/2019
 */

import { StyleSheet, Dimensions, StatusBar } from 'react-native';

const { width, height }  = Dimensions.get('window');

export default styles = StyleSheet.create({
    header: {
        backgroundColor: '#485155',
    },
    header_body: {
        color: '#fff',
        alignItems: 'center'
    },
    white: {
        color: '#fff'
    },
    bg: {
        width: '100%',
        height: 0.28 * height
    },
    about_container: {
        paddingVertical: 8, 
        paddingHorizontal: 16
    },
    about_title: {
        color: '#80A0AB'
    },
    info_container: {
        borderTopColor: '#80A0AB', 
        borderTopWidth: 1, 
        borderBottomColor: '#80A0AB', 
        borderBottomWidth: 1, 
        flexDirection: 'row'
    },
    info_hours: {
        flex: 1, 
        paddingVertical: 8, 
        paddingHorizontal: 16, 
        borderRightColor: '#80A0AB', 
        borderRightWidth: 0.5
    },
    icon_hours: {
        color: '#80A0AB', 
        fontWeight: '900'
    },
    hour: {
        flexDirection: 'row'
    },
    info_address: {
        flex: 1, 
        paddingVertical: 8, 
        paddingHorizontal: 16, 
        borderLeftColor: '#80A0AB', 
        borderLeftWidth: 0.5
    },
    icon_address: {
        color: '#80A0AB',
        fontSize: 20
    },
    rating_container: {
        alignItems: 'center',
        marginBottom: 30
    },
    rating: {
        paddingTop: 16, 
        paddingBottom: 8
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    w_80_p: {
        width: '80%'
    },
    no_data: {
        fontFamily: 'SourceSansPro-Regular', 
        fontWeight: '500', 
        fontSize: 20, 
        textAlign: 'center', 
        color: '#80A0AB'
    },
    salon_icon: {
        fontSize: 20, 
        color: '#fff'
    },
    item_container: {
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingVertical: 2
    },
    item_icon: {
        color: '#80A0AB',
        fontSize: 20
    },
    item: {
        paddingLeft: 8, 
        fontSize: 16
    }
})