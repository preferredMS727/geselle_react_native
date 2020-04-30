/**
 * Description: App Navigator
 * DAte: 2/28/2019
 */

import {createStackNavigator, createAppContainer} from 'react-navigation';

import Login from './pages/login';
import Register from './pages/register';
import ForgotPassword from './pages/forgot_password';
import Tabs from './pages/tabs';
import SelectSalon from './pages/select_salon';
import SelectHairdresser from './pages/select_hairdresser';

const Navigator = createStackNavigator(
    {
        Login: {
            screen: Login, 
            navigationOptions: {
                header: null
            }
        },
        Register: {
            screen: Register, 
            navigationOptions: {
                header: null
            }
        },
        ForgotPassword: {
            screen: ForgotPassword, 
            navigationOptions: {
                header: null
            }
        },
        Tabs: {
            screen: Tabs, 
            navigationOptions: {
                header: null
            }
        },
        SelectSalon: {
            screen: SelectSalon, 
            navigationOptions: {
                header: null
            }
        },
        SelectHairdresser: {
            screen: SelectHairdresser, 
            navigationOptions: {
                header: null
            }
        },
    },
    {
        initialRouteName: 'Tabs'
    }
);

const AppNavigator = createAppContainer(Navigator);
export default AppNavigator;
