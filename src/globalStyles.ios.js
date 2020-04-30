/**
 * Description: Global tyles
 * Date: 2/26/2019
 */

import { StyleSheet, Dimensions, StatusBar } from 'react-native';

const { width, height }  = Dimensions.get('window');

export default globalStyles = StyleSheet.create({
    // Auth pages
    bg_container: {
        width: '100%',
        minHeight: height,
        justifyContent: 'center',
        alignItems: 'center'
    },
    item: {
        borderColor: '#7da8ae', 
        borderWidth: 1, 
        borderRadius: 8
    },
    input: {
        fontFamily: 'SourceSansPro-Regular',
        color: '#485155'
    },
    email_icon: {
        color: '#88A177'
    },
    password_icon: {
        color: '#B3946F'
    },
    user_icon: {
        color: '#D1B65C'
    },
    mt_12: {
        marginTop: 12
    },
    block_button: {
        backgroundColor: '#7da8ae',
        marginTop: 25,
        justifyContent: 'center',
        borderRadius: 8,
        height: 50
    },
    button_text: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
        fontFamily: 'SourceSansPro-Regular'
    },
    divider_container: {
        width: '80%',
        flexDirection: 'row',
        marginVertical: 16,
        alignItems: 'center'
    },
    divider: {
        borderTopColor: '#7da8ae',
        borderTopWidth: 1.5,
        flex: 1
    },

    // All pages
    container: {
        flex: 1,
        height: height - StatusBar.currentHeight
    },
    background: {
        width: width,
        height: height,
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    logo: {
        height: 0.05 * height,
        marginTop: 15,
    },
    content: {
        width: '100%', 
        height: 0.95 * height - StatusBar.currentHeight - 105, 
        marginTop: 15, 
        padding: 8,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderColor: "#eee",
        borderWidth: 1,
    },
    px_8: {
        paddingHorizontal: 8
    },
    form_error: {
        color: '#f00', 
        paddingLeft: 12
    },

    login_title_container: {
        paddingTop: 30, 
        paddingBottom: 15
    },
    login_title: {
        color: '#000', 
        fontSize: 24, 
        textAlign: 'center', 
        textDecorationLine: 'underline'
    },
    login_button_container: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: '10%'
    },
    login_button_text: {
        textAlign: 'center',
        marginTop: 15
    }
})