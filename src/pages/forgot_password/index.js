/**
 * Description: Login page
 * Date: 1/16/2019
 */

import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, TouchableOpacity, Text, Image, ImageBackground } from 'react-native';
import { Container, Content, Form, Item, Input, Button, Icon } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';

import * as Actions from './../../redux/actions';
import globalStyles from "./../../globalStyles";
import styles from "./styles";
import bg from './../../assets/images/bg.png';
import lock from './../../assets/images/lock.png';
import unlock from './../../assets/images/unlock.png';
import * as Utils from './../../utils';
import * as Validators from './../../utils/validator';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading         : false,
      email           : "",
      emailError      : "",
      code            : "",
      codeError       : "",
      password        : "",
      passwordError   : "",
      c_password      : "",
      c_passwordError : "",
      sent            : false
    }
  }

  checkEmail = (value) => {
    let message = Validators.checkEmail(value);

    this.setState({
      emailError: message
    })
  }

  checkLength = (name, value, length) => {
    let message = Validators.checkLength(name, value, length);

    this.setState({
      [name + "Error"]: message
    })
  }

  compare = (value) => {
    let message = Validators.compare('Password', this.state.password, value);

    this.setState({
      c_passwordError: message
    })
  }

  initState = () => {
    this.setState({      
      loading         : false,
      email           : "",
      emailError      : "",
      code            : "",
      codeError       : "",
      password        : "",
      passwordError   : "",
      c_password      : "",
      c_passwordError : "",
      sent            : false
    })
  }

  submit = async () => {
    let can = await this.canSubmit();
    if(can && !this.state.sent) {
      this.setState({
        loading: true
      })
      Utils.xapi().post('consumer/forgotpassword', {
        email     : this.state.email.trim(),
      }).then(() => {
        this.setState({
          loading: false,
          sent: true
        })
      }).catch((err) => {
        this.setState({
          loading : false
        });
        
        Utils.toast(JSON.parse(err.request.response).errorMessage);
      })
    }
    if(can && this.state.sent) {
      this.setState({
        loading: true
      })
      Utils.xapi().post('consumer/setpassword', {
        email       : this.state.email,
        resetCode   : this.state.code,
        newPassword : this.state.password
      }).then(() => {
        Utils.toast('Password was changed.');
        this.initState();
        this.props.navigation.navigate('Login');
      }).catch((err) => {
        console.warn('resetPassword err: ', JSON.parse(err.request.response));
        this.setState({
          loading : false
        });
        
        Utils.toast(JSON.parse(err.request.response).errorMessage);
      })
    }
  }

  canSubmit = async () => {
    if(this.state.sent) {
      await this.checkLength('code', this.state.code);
      await this.checkLength('password', this.state.password);
      await this.compare(this.state.c_password);
      if(this.state.codeError === "" && this.state.passwordError === "" && this.state.c_passwordError === "") {
        return true;
      } else {
        return false
      }
    } else {
      await this.checkEmail(this.state.email);
      if(this.state.emailError === "") {
        return true;
      } else {
        return false
      }
    }    
  }

  render() {
    const { emailError, codeError, passwordError, c_passwordError } = this.state;

    return (
      <Container>
        <Content>
          <ImageBackground
            source={bg}
            style={styles.bg_container}
          >
            <TouchableOpacity style={styles.back} onPress={()=>{this.initState(); this.props.navigation.goBack()}}>
              <Icon name="keyboard-arrow-left" type="MaterialIcons" style={styles.back_icon} />
            </TouchableOpacity>

            <View style={this.state.sent? styles.logo_container : [styles.logo_container, styles.mt_10_p]}>
              <Image
                source={this.state.sent? unlock : lock}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={{fontSize: 20, fontFamily: 'SourceSansPro-Regular', fontWeight: '600'}}>Glömt lösen?</Text>
              <Text style={{textAlign: 'center', fontFamily: 'SourceSansPro-Regular'}}>Ve behöver bara din registrerade e-post så skickar vi en återställningslänk.</Text>
            </View>

            <Form style={styles.form}>
              <Item regular style={globalStyles.item}>
                <Icon active name="email" type="MaterialIcons" style={globalStyles.email_icon} />
                <Input placeholder='E-post' placeholderTextColor='#80A0AB' autoCapitalize = 'none' style={globalStyles.input} onChangeText={(email) => { this.setState({email}); this.checkEmail(email); }} value={this.state.email} disabled={this.state.sent} />
              </Item>
              { emailError !== "" && <Text style={globalStyles.form_error}>{ emailError }</Text> }
              {
                this.state.sent && 
                  <View>
                    <Item regular style={[globalStyles.item, globalStyles.mt_12]}>
                      <Icon active name="verified-user" type="MaterialIcons" style={globalStyles.user_icon} />
                      <Input placeholder='Verifieringskod' placeholderTextColor='#80A0AB' autoCapitalize = 'none' style={globalStyles.input} onChangeText={(code) => { this.setState({code}); this.checkLength('code', code); }} value={this.state.code} />
                    </Item>
                    { codeError !== "" && <Text style={globalStyles.form_error}>{ codeError }</Text> }
                    <Item regular style={[globalStyles.item, globalStyles.mt_12]}>
                      <Icon active name="key" type="FontAwesome" style={globalStyles.password_icon} />
                      <Input secureTextEntry placeholder='Lösen' placeholderTextColor='#80A0AB' autoCapitalize = 'none' style={globalStyles.input} onChangeText={(password) => { this.setState({password}); this.checkLength('password', password, 6); }} value={this.state.password} />
                    </Item>
                    { passwordError !== "" && <Text style={globalStyles.form_error}>{ passwordError }</Text> }
                    <Item regular style={[globalStyles.item, globalStyles.mt_12]}>
                      <Icon active name="key" type="FontAwesome" style={globalStyles.password_icon} />
                      <Input secureTextEntry placeholder='Repetera lösen' placeholderTextColor='#80A0AB' autoCapitalize = 'none' style={globalStyles.input} onChangeText={(c_password) => { this.setState({c_password}); this.compare(c_password); }} value={this.state.c_password} />
                    </Item>
                    { c_passwordError !== "" && <Text style={globalStyles.form_error}>{ c_passwordError }</Text> }
                  </View>
              }              

              <Button block style={this.state.sent? [globalStyles.block_button, styles.button_active] : globalStyles.block_button} onPress={this.submit}>
                <Text style={globalStyles.button_text} uppercase={false}>{this.state.sent? "Återställningslänk skickad!" : "Återställ lösen"}</Text>
              </Button>        
            </Form>

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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setUser: Actions.setUser
  }, dispatch);
};

export default connect(
    null,
    mapDispatchToProps
)(ForgotPassword)