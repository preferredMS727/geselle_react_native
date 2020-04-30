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
    container: {
        width: width,
        minHeight: height - StatusBar.currentHeight - 86,
        alignItems: 'center'
    },
    bg: {
        width: width, 
        height: height, 
        position: 'absolute', 
        top: 0, 
        left: 0
    },
    avatar_container: {
        borderColor: '#80A0AB', 
        borderWidth: 1, 
        borderStyle: 'solid', 
        borderRadius: 12, 
        padding: 8, 
        marginTop: 50
    },
    avatar: {
        width: 70, 
        height: 70, 
        borderRadius: 8
    },
    upload_container: {
        alignItems: 'center', 
        marginTop: 8
    },
    h_20: {
        height: 20
    },
    upload_text: {
        fontFamily: 'SourceSansPro-Regular', 
        color: '#80A0AB'
    },
    form: {
        width: '80%',
        marginTop: 8
    },
    ml_0: {
        marginLeft: 0
    },
    logout: {
        textAlign: 'center', 
        color: '#7da8ae', 
        fontSize: 16, 
        fontWeight: '700', 
        marginVertical: 15
    },
    delete: {
        textAlign: 'center', 
        color: '#f00', 
        fontSize: 16, 
        fontWeight: '700', 
        marginTop: 15, 
        marginBottom: 45
    }
})