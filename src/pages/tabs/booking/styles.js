/**
 * Description: Login page Styles
 * Date: 1/16/2019
 */

import { StyleSheet } from 'react-native';

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
    },

    header: {
        backgroundColor: '#485155',
    },
    header_body: {
        color: '#fff',
        alignItems: 'center',
        fontFamily: 'Merriweather-Regular',
    },
    clsh_container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8
    },
    clsh_service: {
        backgroundColor: '#80a0ab'
    },
    flex_1: {
        flex: 1
    },
    clsh_title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff'
    },
    color_white: {
        color: '#fff'
    },
    p_16: {
        padding: 16
    },
    service_item: {
        backgroundColor: '#faf8ee',
        padding: 8,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    service_image: {
        width: 50, 
        height: 50, 
        borderRadius: 4
    },
    px_8: {
        paddingHorizontal: 8
    },
    service_name: {
        color: '#88a177',
        fontSize: 18
    },
    time_price: {
        fontSize: 12,
        color: '#80a0ab'
    },
    add_icon: {
        color: '#88a177', 
        fontSize: 36
    },
    clsh_date: {
        backgroundColor: '#d1b65c'
    },
    time_button: {
        width: 80,
        marginHorizontal: 8,
        marginVertical: 16,
        borderColor: '#80a0ab', 
        borderWidth: 1, 
        borderRadius: 4, 
        padding: 4
    },
    time: {        
        color: '#80a0ab',
        textAlign: 'center'
    },
    clsh_booked: {
        backgroundColor: '#b3946f'
    },
    book_count: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 20
    },
    flex_2: {
        flex: 2
    },
    booked_name: {
        color: '#b3946f',
        fontSize: 18
    },
    remove_icon: {
        color: '#b3946f', 
        fontSize: 36
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
    }
})