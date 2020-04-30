/**
    Description: Bottom tab navigator
    Author: Danijel
    Date: 2018-11-12
*/

import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { View, Image } from 'react-native'
import { Text } from 'native-base';

import Featured from './featured';
import AboutUs from './about_us';
import Shop from './shop';
import Booking from './booking';
import Settings from './settings';
import styles from './styles';

import star from './../../assets/images/icons/star.png';
import star_check from './../../assets/images/icons/star_check.png';
import about from './../../assets/images/icons/about.png';
import about_check from './../../assets/images/icons/about_check.png';
import book from './../../assets/images/icons/book.png';
import check from './../../assets/images/icons/check.png';
import shop from './../../assets/images/icons/shop.png';
import shop_check from './../../assets/images/icons/shop_check.png';
import more from './../../assets/images/icons/more.png';
import more_check from './../../assets/images/icons/more_check.png';

const Tabs = createBottomTabNavigator(
    {
        Featured: {
            screen: Featured,
            navigationOptions: {
                title: 'Featured',
                tabBarIcon: ({ tintColor, focused }) => (
                        <View style={styles.tab}>
                            <Image source={focused? star_check : star} style={styles.icon} />
                            <Text style={[styles.name, {color: tintColor}]}>Kampanjer</Text>
                        </View>
                    )
            }
        },
        AboutUs: {
            screen: AboutUs,
            navigationOptions: {
                title: 'About Us',
                tabBarIcon: ({ tintColor, focused }) => (
                            <View style={styles.tab}>
                                <Image source={focused? about_check : about} style={styles.icon} />
                                <Text style={[styles.name, {color: tintColor}]}>Om oss</Text>
                            </View>
                        )
            }
        },
        Booking: {
            screen: Booking,
            navigationOptions: {
                title: 'MIN SALONG',
                tabBarIcon: ({ tintColor, focused }) => (
                            <View style={styles.book}>
                                <Image source={focused? check : book} style={styles.book_icon} />
                            </View>
                        )
            }
        },
        Shop: {
            screen: Shop,
            navigationOptions: {
                title: 'Shop',
                tabBarIcon: ({ tintColor, focused }) => (
                            <View style={styles.tab}>
                                <Image source={focused? shop_check : shop} style={styles.icon} />
                                <Text style={[styles.name, {color: tintColor}]}>Shop</Text>
                            </View>
                        )
            }
        },
        Settings: {
            screen: Settings,
            navigationOptions: {
                title: 'More',
                tabBarIcon: ({ tintColor, focused }) => (
                            <View style={styles.tab}>
                                <Image source={focused? more_check : more} style={styles.icon} />
                                <Text style={[styles.name, {color: tintColor}]}>Inställningar</Text>
                            </View>
                        )
            }
        },
    },
    {
        initialRouteName: 'Featured',
        tabBarOptions: {
            activeTintColor: '#80A0AB',
            inactiveTintColor: '#fff',
            showLabel: false,
            style: {
                height: 60,
                backgroundColor: '#485155'
            },
            labelStyle: {
                fontSize: 12,
                fontFamily: 'Abel-Regular'
            }
        }  
    }
);

export default createStackNavigator({Tabs}, {headerMode: "none"});