/**
 * Description: Login page
 * Date: 1/16/2019
 */

import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, TouchableOpacity, Text, ImageBackground } from 'react-native';
import { Container, Content, Form, Item, Input, Button, Icon } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';

import * as Actions from './../../redux/actions';
import globalStyles from "./../../globalStyles";
import styles from "./styles";
import bg from './../../assets/images/bg.png';
import * as Utils from './../../utils';
import * as Validators from './../../utils/validator';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading         : false,
      firstname       : "",
      firstnameError  : "",
      lastname        : "",
      lastnameError   : "",
      email           : "",
      emailError      : "",
      password        : "",
      passwordError   : "",
      c_password      : "",
      c_passwordError : "",
      accept_privacy  : false
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
    let message = Validators.compare('Lösenorden', this.state.password, value);

    this.setState({
      c_passwordError: message
    })
  }

  initState = () => {
    this.setState({  
      loading         : false,
      firstname       : "",
      firstnameError  : "",
      lastname        : "",
      lastnameError   : "",
      email           : "",
      emailError      : "",
      password        : "",
      passwordError   : "",
      c_password      : "",
      c_passwordError : "",
      accept_privacy  : false
    })
  }

  signUp = async () => {
    let can = await this.canSignUp();
    if(can) {
      this.setState({
        loading: true
      })
      Utils.xapi().post('consumer/register', {
        firstName : this.state.firstname,
        lastName  : this.state.lastname,
        email     : this.state.email.trim(),
        password  : this.state.password
      }).then((res) => {
        console.warn('signUp userData: ', res.data);
        let userData = {
          loginType: "email",
          accessToken: res.data.accessToken,
          consumerId: res.data.user.id,
          salonId: res.data.user.WorkingFor && res.data.user.WorkingFor.Salon? res.data.user.WorkingFor.Salon.SalonId : "",
          salonName: res.data.user.WorkingFor && res.data.user.WorkingFor.Salon? res.data.user.WorkingFor.Salon.name : "",
          hairdresserId: res.data.user.WorkingFor && res.data.user.WorkingFor.Employee? res.data.user.WorkingFor.Employee.hairdresserId : "",
          hairdresserName: res.data.user.WorkingFor && res.data.user.WorkingFor.Employee? res.data.user.WorkingFor.Employee.name : "",
          name: res.data.user.name,
          email: res.data.user.email.trim()
        }
        this.props.setUser(userData);
        this.initState();
        this.props.navigation.navigate('Tabs');
        Utils.toast("Den här användaren är redan registrerad.");
      }).catch((err) => {
        this.setState({
          loading : false
        });
        
        Utils.toast(JSON.parse(err.request.response).errorMessage);
      })
    }
  }

  canSignUp = async () => {
    await this.checkLength('firstname', this.state.firstname);
    await this.checkLength('lastname', this.state.lastname);
    await this.checkEmail(this.state.email);
    await this.checkLength('password', this.state.password);
    await this.compare(this.state.c_password);
    if(this.state.firstnameError === "" && this.state.lastnameError === "" && this.state.emailError === "" && this.state.passwordError === "" && this.state.c_passwordError === "") {
      return true;
    } else {
      return false
    }
  }

  render() {
    const { firstnameError, lastnameError, emailError, passwordError, c_passwordError } = this.state;

    return (
      <Container>
        <Content>
          <ImageBackground
            source={bg}
            style={styles.bg_container}
          >
            <TouchableOpacity style={styles.back} onPress={()=> {this.initState(); this.props.navigation.goBack()}}>
              <Icon name="keyboard-arrow-left" type="MaterialIcons" style={styles.back_icon} />
            </TouchableOpacity>

            <View style={[globalStyles.divider_container, {marginVertical: 32}]}>
              <View style={globalStyles.divider}></View>
              <Text style={styles.divider_text}>Registrera dig</Text>
              <View style={globalStyles.divider}></View>
            </View>

            <Form style={styles.form}>
              <Item regular style={globalStyles.item}>
                <Icon active name="user" type="Entypo" style={globalStyles.user_icon} />
                <Input placeholder='Förnamn' placeholderTextColor='#80A0AB' autoCapitalize = 'none' style={globalStyles.input} onChangeText={(firstname) => { this.setState({firstname}); this.checkLength('Förnamn', firstname); }} value={this.state.firstname} />
              </Item>
              { firstnameError !== "" && <Text style={globalStyles.form_error}>{ firstnameError }</Text> }
              <Item regular style={[globalStyles.item, globalStyles.mt_12]}>
                <Icon active name="user" type="Entypo" style={globalStyles.user_icon} />
                <Input placeholder='Efternamn' placeholderTextColor='#80A0AB' autoCapitalize = 'none' style={globalStyles.input} onChangeText={(lastname) => { this.setState({lastname}); this.checkLength('Efternamn', lastname); }} value={this.state.lastname} />
              </Item>
              { lastnameError !== "" && <Text style={globalStyles.form_error}>{ lastnameError }</Text> }
              <Item regular style={[globalStyles.item, globalStyles.mt_12]}>
                <Icon active name="email" type="MaterialIcons" style={globalStyles.email_icon} />
                <Input placeholder='E-post' placeholderTextColor='#80A0AB' autoCapitalize = 'none' style={globalStyles.input} onChangeText={(email) => { this.setState({email}); this.checkEmail(email); }} value={this.state.email} />
              </Item>
              { emailError !== "" && <Text style={globalStyles.form_error}>{ emailError }</Text> }
              <Item regular style={[globalStyles.item, globalStyles.mt_12]}>
                <Icon active name="key" type="FontAwesome" style={globalStyles.password_icon} />
                <Input secureTextEntry placeholder='Lösen' placeholderTextColor='#80A0AB' autoCapitalize = 'none' style={globalStyles.input} onChangeText={(password) => { this.setState({password}); this.checkLength('Lösenord', password, 6); }} value={this.state.password} />
              </Item>
              { passwordError !== "" && <Text style={globalStyles.form_error}>{ passwordError }</Text> }
              <Item regular style={[globalStyles.item, globalStyles.mt_12]}>
                <Icon active name="key" type="FontAwesome" style={globalStyles.password_icon} />
                <Input secureTextEntry placeholder='Repetera lösen' placeholderTextColor='#80A0AB' autoCapitalize = 'none' style={globalStyles.input} onChangeText={(c_password) => { this.setState({c_password}); this.compare(c_password); }} value={this.state.c_password} />
              </Item>
              { c_passwordError !== "" && <Text style={globalStyles.form_error}>{ c_passwordError }</Text> }

              <View style={styles.privacy}>
                <TouchableOpacity style={this.state.accept_privacy? styles.checked_container : styles.unchecked_container} onPress={()=>this.setState(prevState=> ({accept_privacy: !prevState.accept_privacy}))}>
                  {
                    this.state.accept_privacy && (<Icon name="check" type="FontAwesome5" style={styles.check_icon} />)
                  }
                </TouchableOpacity>
                <Text>Jag accepterar användarvillkoren och personuppgiftsbehandling</Text>
              </View>

              <Button block style={[globalStyles.block_button, {marginBottom: 15}]} onPress={this.signUp}>
                <Text style={globalStyles.button_text} uppercase={false}>Registrera dig</Text>
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
)(Register)