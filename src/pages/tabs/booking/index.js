/**
 * Description: Booking page
 * Date: 3/25/2019
 */

import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, WebView, Linking, TouchableOpacity, Image } from 'react-native';
import { Text, Button, Icon } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import { NavigationEvents } from "react-navigation";

import * as Actions from './../../../redux/actions';
import * as Utils from './../../../utils';
import styles from "./styles";
import CustomIcon from './../../../assets/CustomIcon';
import login_img from './../../../assets/images/temp.png';
class Booking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      canGoBack: false,
      canGoForward: false
    }
  }

  componentDidMount() {
    this.props.getUser().then(() => {
      if(this.props.accessToken) {
        this.setState({
          loading: true
        })
      }
    });
  }

  onNavigationStateChange = (navState) => {
    this.setState({
      canGoBack: navState.canGoBack,
      canGoForward: navState.canGoForward
    });
  }

  onBack = () => {
    this.webview.goBack();
  }

  onForward = () => {
    this.webview.goForward();
  }

  render() {
    let salonId = this.props.salonId === ""? null : this.props.salonId;
    const uri = Utils.root + '/booking/' + salonId;
    
    return (
      <View>
        <NavigationEvents
          onWillFocus={() => {
            if (!this.state.loading) {
              console.warn('booking reload')
              this.webView && this.webView.reload();
            }
          }}
        />
        {
          this.props.accessToken? (
            <View style={salonId? styles.container : globalStyles.bg_container}>
              {
                !salonId && 
                  <View style={styles.w_80_p}>
                    <Button block style={[globalStyles.block_button, {backgroundColor: '#88A177'}]} onPress={() => this.props.navigation.navigate('SelectSalon')}>
                      <CustomIcon name='salon' style={styles.salon_icon} />
                      <Text style={globalStyles.button_text} uppercase={false}> Välj din salong</Text>
                    </Button>
                  </View>
              }
              {
                salonId &&                
                  <View style={styles.toolbar}>
                    <Button transparent disabled={!this.state.canGoBack} onPress={() => this.onBack()}>
                      <Icon style={styles.icon} name='arrow-back' />
                    </Button>
                    <Text style={styles.title}>Booking</Text>
                    <Button transparent disabled={!this.state.canGoForward} onPress={() => this.onForward()}>
                      <Icon style={styles.icon} name='arrow-forward' />
                    </Button>
                  </View>
              }
              {
                salonId && 
                  <WebView
                    ref={(ref) => { this.webview = ref; }}
                    source={{ uri }}
                    onNavigationStateChange={(event) => {
                      if (event.url !== uri) {
                        this.webview.stopLoading();
                        Linking.openURL(event.url);
                      }
                    }}
                    onLoadEnd={() => this.setState({loading: false})}
                    onNavigationStateChange={this.onNavigationStateChange}
                  />
              }
            </View>
          ) : (
              <View>
                <View style={globalStyles.login_title_container}>
                  <Text style={globalStyles.login_title}>VARMT VÄLKOMMEN</Text>
                  <Text style={globalStyles.login_title}>TILL GESELLE KEDJAN</Text>
                </View>
                <Image source={login_img}></Image>
                <View style={globalStyles.login_button_container}>
                  <Button block style={globalStyles.block_button} onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={globalStyles.button_text} uppercase={false}>Logga in & Välj din salong</Text>
                  </Button>
                  <Text style={globalStyles.login_button_text}>För att använda denna sida måste du vara inloggad och ha valt salong.</Text>
                </View>
              </View>
          )
        }   
        <Spinner
          visible={this.state.loading}
          color={'#7da8ae'}
          />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  consumerId  : state.user.consumerId,
  accessToken : state.user.accessToken,
  salonId     : state.user.salonId
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getUser: Actions.getUser
  }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Booking)