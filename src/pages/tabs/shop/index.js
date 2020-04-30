/**
 * Description: Login page
 * Date: 1/16/2019
 */

import React, {Component} from 'react';
import { View, WebView, Text } from 'react-native';
import { Button, Icon} from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';

import styles from "./styles";

export default class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading : true,
      canGoBack: false,
      canGoForward: false
    }
  }

  onNavigationStateChange = (navState) => {
    console.warn("onNavigationStateChange: ", navState)
    this.setState({
      canGoBack: navState.canGoBack,
      canGoForward: navState.canGoForward
    });
  }

  onBack = () => {
    console.warn('back')
    this.refs["shop_webview"].goBack();
  }

  onForward = () => {
    console.warn('forward')
    this.refs["shop_webview"].goForward();
  }

  render() {
    const uri = this.props.navigation.getParam('uri', 'https://geselle.se/product-category/harvard/schampo/');
    return (
      <View style={styles.container}>
        <View style={styles.toolbar}>
          <Button transparent disabled={!this.state.canGoBack} onPress={() => this.onBack()}>
            <Icon style={styles.icon} name='arrow-back' />
          </Button>
          <Text style={styles.title}>Shop</Text>
          <Button transparent disabled={!this.state.canGoForward} onPress={() => this.onForward()}>
            <Icon style={styles.icon} name='arrow-forward' />
          </Button>
        </View>
        <WebView
          ref="shop_webview" 
          source={{uri: uri}}
          onLoadEnd={() => this.setState({loading: false})}
          onNavigationStateChange={this.onNavigationStateChange}
        />

        <Spinner
          visible={this.state.loading}
          color={'#7da8ae'}
          />
      </View>
    );
  }
}