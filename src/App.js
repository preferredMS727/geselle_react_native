/**
 * Description: App
 * Date: 1/25/2019
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';

import Store from './redux/store';
import AppNavigator from './AppNavigator';

export default class App extends Component {

  render() {
    return (
      <Provider store={Store}>
        <AppNavigator />
      </Provider>
    );
  }
}