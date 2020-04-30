/**
 * Description: Login page
 * Date: 1/16/2019
 */

import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, TouchableOpacity, Text, Image, ImageBackground } from 'react-native';
import { Container, Content, Form, Item, Input, Button, Icon } from 'native-base';
import { GoogleSignin } from 'react-native-google-signin';
import { FBLoginManager } from 'react-native-facebook-login';
import Spinner from 'react-native-loading-spinner-overlay';
import SplashScreen from 'react-native-splash-screen';

import * as Actions from './../../redux/actions';
import globalStyles from "./../../globalStyles";
import styles from "./styles";
import logo from './../../assets/images/logo.png';
import bg from './../../assets/images/bg.png';
import facebook from './../../assets/images/facebook.png';
import google from './../../assets/images/google.png';
import * as Utils from './../../utils';
import * as Validators from './../../utils/validator';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading       : false,
      email         : "",
      emailError    : "",
      password      : "",
      passwordError : ""
    }

    this.props.getUser().then(() => {
      console.warn('getUser: ', this.props.user);
      if(this.props.accessToken)
        this.props.navigation.navigate('Tabs');
      
      setTimeout(() => {
        SplashScreen.hide();        
      }, 1000);
    })
  }

  componentDidMount() {
    GoogleSignin.configure({
      webClientId: "613157658633-h5n0k9n2qatjpc7bthtg11vg8ko1mhd5.apps.googleusercontent.com",
      offlineAccess: true,
      accountName: ""
    });
  }

  checkEmail = (value) => {
    let message = Validators.checkEmail(value);

    this.setState({
      emailError: message
    })
  }

  checkPassword = (value) => {
    let message = Validators.checkLength('Lösenord', value);

    this.setState({
      passwordError: message
    })
  }

  initState = () => {
    this.setState({  
      loading       : false,    
      email         : "",
      emailError    : "",
      password      : "",
      passwordError : ""
    })
  }

  signIn = async () => {
    await this.checkEmail(this.state.email);
    await this.checkPassword(this.state.password);
    if(this.state.emailError === "" && this.state.passwordError === "") {
      this.setState({
        loading: true
      })
      Utils.xapi().post('auth/email/login', {
        email   : this.state.email.trim(),
        password: this.state.password
      }).then((res) => {
        console.warn('signIn data: ', res.data);
        let userData = {
          loginType: "email",
          accessToken: res.data.accessToken,
          consumerId: res.data.user.id,
          salonId: res.data.user.WorkingFor && res.data.user.WorkingFor.Salon? res.data.user.WorkingFor.Salon.SalonId : "",
          salonName: res.data.user.WorkingFor && res.data.user.WorkingFor.Salon? res.data.user.WorkingFor.Salon.name : "",
          hairdresserId: res.data.user.WorkingFor && res.data.user.WorkingFor.Employee? res.data.user.WorkingFor.Employee.hairdresserId : "",
          hairdresserName: res.data.user.WorkingFor && res.data.user.WorkingFor.Employee? res.data.user.WorkingFor.Employee.name : "",
          name: res.data.user.name,
          email: res.data.user.email
        }
        console.warn('signIn userData: ', userData);
        this.props.setUser(userData);
        this.initState();
        this.props.navigation.navigate('Tabs');
      }).catch((err) => {
        console.warn('signIn err: ', err);
        this.setState({
          loading : false
        });
        
        Utils.toast(JSON.parse(err.request.response).errorMessage);
      })
    }
  }

  googleSignIn = async () => {
    try {
      this.setState({
        loading: true
      })
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.warn('google data: ', userInfo);
      
      Utils.xapi().post('auth/google/login', {
        idToken: userInfo.idToken
      }).then((res) => {
        let userData = {
          loginType: "google",
          accessToken: res.data.accessToken,
          consumerId: res.data.user.id,
          salonId: res.data.user.WorkingFor && res.data.user.WorkingFor.Salon? res.data.user.WorkingFor.Salon.SalonId : "",
          salonName: res.data.user.WorkingFor && res.data.user.WorkingFor.Salon? res.data.user.WorkingFor.Salon.name : "",
          hairdresserId: res.data.user.WorkingFor && res.data.user.WorkingFor.Employee? res.data.user.WorkingFor.Employee.hairdresserId : "",
          hairdresserName: res.data.user.WorkingFor && res.data.user.WorkingFor.Employee? res.data.user.WorkingFor.Employee.name : "",
          name: res.data.user.name,
          email: res.data.user.email
        }
        console.warn('googleSignIn userData: ', userData);
        this.props.setUser(userData);
        this.initState();
        this.props.navigation.navigate('Tabs')
      })
    } catch (error) {
      this.setState({
        loading: false
      })

      Utils.toast('Google login error. Code is ' + error.code);
    }
  };

  facebookSignIn = () => { 
    this.setState({
      loading: true
    })
    FBLoginManager.loginWithPermissions(["email"], (error, data) => {
      if (!error) {
        console.warn('facebook data: ', data);
        Utils.xapi().post('auth/facebook/login', {
          inputToken: data.credentials.token
        }).then((res) => {
          let userData = {
            loginType: "facebook",
            accessToken: res.data.accessToken,
            consumerId: res.data.user.id,
            salonId: res.data.user.WorkingFor && res.data.user.WorkingFor.Salon? res.data.user.WorkingFor.Salon.SalonId : "",
            salonName: res.data.user.WorkingFor && res.data.user.WorkingFor.Salon? res.data.user.WorkingFor.Salon.name : "",
            hairdresserId: res.data.user.WorkingFor && res.data.user.WorkingFor.Employee? res.data.user.WorkingFor.Employee.hairdresserId : "",
            hairdresserName: res.data.user.WorkingFor && res.data.user.WorkingFor.Employee? res.data.user.WorkingFor.Employee.name : "",
            name: res.data.user.name,
            email: res.data.user.email? res.data.user.email : ""
          }
          console.warn('facebookSignIn userData: ', userData);
          this.props.setUser(userData);
          this.initState();
          this.props.navigation.navigate('Tabs');
        })
      } else {
        this.setState({
          loading: false
        });

        Utils.toast('Facebook login error - ' + error.error.message);
      }
    })
  }

  render() {
    const { emailError, passwordError } = this.state;
    return (
      <Container>
        <Content>
          <ImageBackground
            source={bg}
            style={globalStyles.bg_container}
          >
            <TouchableOpacity style={styles.back} onPress={()=> {this.initState(); this.props.navigation.goBack()}}>
              <Icon name="keyboard-arrow-left" type="MaterialIcons" style={styles.back_icon} />
            </TouchableOpacity>

            <Image
              source={logo}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text>Nordic | Style | Hair</Text>

            <Form style={styles.form}>
              <Item regular style={globalStyles.item}>
                <Icon active name="email" type="MaterialIcons" style={globalStyles.email_icon} />
                <Input placeholder='E-post' placeholderTextColor='#80A0AB' autoCapitalize = 'none' style={globalStyles.input} onChangeText={(email) => { this.setState({email}); this.checkEmail(email); }} value={this.state.email} />
              </Item>
              { emailError !== "" && <Text style={globalStyles.form_error}>{ emailError }</Text> }
              <Item regular style={[globalStyles.item, globalStyles.mt_12]}>
                <Icon active name="key" type="FontAwesome" style={globalStyles.password_icon} />
                <Input secureTextEntry placeholder='Lösen' placeholderTextColor='#80A0AB' autoCapitalize = 'none' style={globalStyles.input} onChangeText={(password) => { this.setState({password}); this.checkPassword(password); }} value={this.state.password} />
              </Item>
              { passwordError !== "" && <Text style={globalStyles.form_error}>{ passwordError }</Text> }

              <Button block style={globalStyles.block_button} onPress={this.signIn}>
                <Text style={globalStyles.button_text} uppercase={false}>Logga in</Text>
              </Button>        
            </Form>

            <View style={globalStyles.divider_container}>
              <View style={globalStyles.divider}></View>
              <Text style={styles.divider_text}>Eller</Text>
              <View style={globalStyles.divider}></View>
            </View>

            <View style={styles.social_container}>
              {/* <TouchableOpacity style={globalStyles.px_8} onPress={this.facebookSignIn}>
                <Image source={facebook} style={styles.social_button} />
              </TouchableOpacity> */}
              <TouchableOpacity style={globalStyles.px_8} onPress={this.googleSignIn}>
                <Image source={google} style={styles.social_button} />
              </TouchableOpacity>
            </View>

            <View style={styles.link_container}>
              <TouchableOpacity>
                <Text style={styles.link_text} onPress={() => {this.initState(); this.props.navigation.navigate('ForgotPassword')}}>Glömt lösen?</Text>
              </TouchableOpacity>
              <TouchableOpacity style={globalStyles.mt_12}>
                <Text style={styles.link_text} onPress={() => {this.initState(); this.props.navigation.navigate('Register')}}>Registrera dig</Text>
              </TouchableOpacity>
            </View>

            <Spinner
              visible={this.state.loading}
              color={'#7da8ae'}
              />

          </ImageBackground>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  accessToken: state.user.accessToken
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setUser: Actions.setUser,
    getUser: Actions.getUser
  }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)