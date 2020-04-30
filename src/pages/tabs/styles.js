/**
 * Description: Tabs Styles
 * Date: 3/25/2019
 */

import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    tab: {
        alignItems: 'center'
    },
    icon: {
        width: 24, 
        height: 24, 
        resizeMode: 'contain'
    },
    name: {
        fontSize: 12,
        fontFamily: 'SourceSansPro-Regular'
    },
    book: {
        marginTop: -48, 
        padding: 6, 
        backgroundColor: '#88a177', 
        borderRadius: 8, 
        alignItems: 'center'
    },
    book_icon: {
        width: 48, 
        height: 48, 
        resizeMode: 'contain'
    }
})