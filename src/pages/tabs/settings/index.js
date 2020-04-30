/**
 * Description: Login page
 * Date: 1/16/2019
 */

import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import { Container, Header, Body, Title, Content, Form, Text, Item, Input, Button, Icon } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import { NavigationEvents } from "react-navigation";

import * as Actions from './../../../redux/actions';
import globalStyles from "./../../../globalStyles";
import styles from "./styles";
import * as Utils from './../../../utils';
import * as Validators from './../../../utils/validator';
import login_img from './../../../assets/images/temp.png';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading           : false,
      firstname         : "",
      firstnameError    : "",
      lastname          : "",
      lastnameError     : "",
      email             : "",
      emailError        : "",
      oldPassword       : "",
      oldPasswordError  : "",
      newPassword       : "",
      newPasswordError  : "",
      c_password        : "",
      c_passwordError   : "",
      changedProfile    : false
    }
  }

  checkEmail = (value) => {
    let message = Validators.checkEmail(value.trim());

    this.setState({
      emailError      : message,
      changedProfile  : true
    })
  }

  checkLength = (name, value, length) => {
    let message = Validators.checkLength(name, value, length);

    this.setState({
      [name + "Error"]: message,
      changedProfile  : true
    })
  }

  compare = (value) => {
    let message = Validators.compare('NewPassword', this.state.newPassword, value);

    this.setState({
      c_passwordError : message
    })
  }

  update = async () => {
    let can = await this.canUpdate();
    if(can) {
      this.setState({
        loading: true
      })
      Utils.xapi().post('consumer/updateprofile', {
        name        : this.state.firstname + " " + this.state.lastname,
        email       : this.state.email.trim(),
        oldPassword : this.state.oldPassword,
        newPassword : this.state.newPassword
      }).then((res) => {
        let userData = {
          accessToken: res.data.accessToken,
          consumerId: res.data.user.id,
          salonId: res.data.user.WorkingFor && res.data.user.WorkingFor.Salon? res.data.user.WorkingFor.Salon.SalonId : "",
          salonName: res.data.user.WorkingFor && res.data.user.WorkingFor.Salon? res.data.user.WorkingFor.Salon.name : "",
          hairdresserId: res.data.user.WorkingFor && res.data.user.WorkingFor.Employee? res.data.user.WorkingFor.Employee.hairdresserId : "",
          hairdresserName: res.data.user.WorkingFor && res.data.user.WorkingFor.Employee? res.data.user.WorkingFor.Employee.name : "",
          name: res.data.user.name,
          email: res.data.user.email
        }
        console.warn('update profile userData: ', res.data);
        this.props.setUser(userData);
        this.setState({
          loading: false
        })
      }).catch((err) => {
        console.warn('update profile err: ', err);
        this.setState({
          loading : false
        });
        
        Utils.toast(JSON.parse(err.request.response).error);
      })
    }
  }
  canUpdate = async () => {
    await this.checkLength('firstname', this.state.firstname);
    await this.checkLength('lastname', this.state.lastname);
    await this.checkEmail(this.state.email);
    if(this.state.newPassword !== "") {
      await this.checkLength('oldPassword', this.state.oldPassword);
      await this.checkLength('newPassword', this.state.newPassword);
      await this.compare(this.state.c_password);
    }
    if(this.state.firstnameError === "" && this.state.lastnameError === "" && this.state.emailError === "" && this.state.oldPasswordError === "" && this.state.newPasswordError === "" && this.state.c_passwordError === "") {
      return true;
    } else {
      return false
    }
  }

  logout = () => {
    this.props.clearUser();
    this.props.clearSaloninfo();
  }

  render() {
    const { loginType, salonId, salonName, hairdresserName, accessToken } = this.props;
    const { firstnameError, lastnameError, emailError, oldPasswordError, newPasswordError, c_passwordError } = this.state;
    console.warn('hairdresserName: ', hairdresserName)
    return (
      <Container>
        <NavigationEvents
          onWillFocus={() => {
            this.props.getUser().then(() => {
              console.warn("props: ", this.props)
              let index = this.props.name.indexOf(' ')
              this.setState({
                email: this.props.email,
                firstname: this.props.name.substring(0, index),
                lastname: this.props.name.substring(index + 1, this.props.name.length)
              })
            })
          }}
        />
        {
          accessToken &&
            <Header style={styles.header}>
              <Body style={styles.header_body}>
                <Title style={styles.white}>Inställningar</Title>
              </Body>
            </Header>
        }
        <Content>
          {
            accessToken? (
              <View style={styles.container}>  
                {/* <Image source={bg1} style={styles.bg}/>
                <View style={styles.avatar_container}>
                  <Image source={avatar2} style={styles.avatar} />            
                </View>
                <TouchableOpacity style={styles.upload_container}>
                  <Image source={upload} resizeMode="contain" style={styles.h_20} />
                  <Text style={styles.upload_text}>upload new photo</Text>
                </TouchableOpacity> */}

                <Form style={[styles.form, {marginTop: 20}]}>
                  <Item active style={styles.ml_0}>
                    <Icon active name="user" type="Entypo" style={globalStyles.user_icon} />
                    <Input placeholder='Förnamn' placeholderTextColor='#80A0AB' autoCapitalize = 'none' style={globalStyles.input} onChangeText={(firstname) => { this.setState({firstname}); this.checkLength('firstname', firstname); }} value={this.state.firstname} />
                  </Item>
                  { firstnameError !== "" && <Text style={globalStyles.form_error}>{ firstnameError }</Text> }
                  <Item active style={styles.ml_0}>
                    <Icon active name="user" type="Entypo" style={globalStyles.user_icon} />
                    <Input placeholder='Efternamn' placeholderTextColor='#80A0AB' autoCapitalize = 'none' style={globalStyles.input} onChangeText={(lastname) => { this.setState({lastname}); this.checkLength('lastname', lastname); }} value={this.state.lastname} />
                  </Item>
                  { lastnameError !== "" && <Text style={globalStyles.form_error}>{ lastnameError }</Text> }
                  <Item active style={styles.ml_0}>
                    <Icon active name="email" type="MaterialIcons" style={globalStyles.email_icon} />
                    <Input placeholder='E-post' placeholderTextColor='#80A0AB' autoCapitalize = 'none' style={globalStyles.input} onChangeText={(email) => { this.setState({email}); this.checkEmail(email); }} value={this.state.email} />
                  </Item>
                  { emailError !== "" && <Text style={globalStyles.form_error}>{ emailError }</Text> }
                  {
                    loginType === "email" &&
                      <Item active style={styles.ml_0}>
                        <Icon active name="key" type="FontAwesome" style={globalStyles.password_icon} />
                        <Input secureTextEntry placeholder='Gammal Lösen' placeholderTextColor='#80A0AB' autoCapitalize = 'none' style={globalStyles.input} onChangeText={(oldPassword) => { this.setState({oldPassword}); this.checkLength('oldPassword', oldPassword, 6); }} value={this.state.oldPassword} />
                      </Item>
                  }
                  { oldPasswordError !== "" && <Text style={globalStyles.form_error}>{ oldPasswordError }</Text> }
                  {
                    loginType === "email" &&
                      <Item active style={styles.ml_0}>
                        <Icon active name="key" type="FontAwesome" style={globalStyles.password_icon} />
                        <Input secureTextEntry placeholder='Ny Lösen' placeholderTextColor='#80A0AB' autoCapitalize = 'none' style={globalStyles.input} onChangeText={(newPassword) => { this.setState({newPassword}); this.checkLength('newPassword', newPassword, 6); }} value={this.state.newPassword} />
                      </Item>
                  }
                  { newPasswordError !== "" && <Text style={globalStyles.form_error}>{ newPasswordError }</Text> }
                  { this.state.newPassword !== "" &&
                    <Item active style={styles.ml_0}>
                      <Icon active name="key" type="FontAwesome" style={globalStyles.password_icon} />
                      <Input secureTextEntry placeholder='Repetera Ny Lösen' placeholderTextColor='#80A0AB' autoCapitalize = 'none' style={globalStyles.input} onChangeText={(c_password) => { this.setState({c_password}); this.compare(c_password); }} value={this.state.c_password} />
                    </Item>
                  }
                  { c_passwordError !== "" && <Text style={globalStyles.form_error}>{ c_passwordError }</Text> }

                  <Item active style={styles.ml_0}>
                    <Input placeholder='Välj salong' placeholderTextColor='#80A0AB' autoCapitalize = 'none' style={globalStyles.input} disabled={true} value={salonName} />
                    <Icon active name="arrow-bold-right" type="Entypo" style={globalStyles.email_icon} onPress={() => this.props.navigation.navigate('SelectSalon')} />
                  </Item>

                  <Item active style={styles.ml_0}>
                    <Input placeholder='Välj frisör' placeholderTextColor='#80A0AB' autoCapitalize = 'none' style={globalStyles.input} disabled={true} value={hairdresserName} />
                    <Icon active name="arrow-bold-right" type="Entypo" style={globalStyles.email_icon} onPress={() => this.props.navigation.navigate('SelectHairdresser', { salon: {salonId: salonId, name: salonName}})} />
                  </Item>
                  
                  <Button block style={globalStyles.block_button} onPress={this.update} disabled={!this.state.changedProfile}>
                    <Text style={globalStyles.button_text} uppercase={false}>Uppdatera</Text>
                  </Button>

                  <TouchableOpacity onPress={this.logout}>
                    <Text style={styles.logout}>Logga ut</Text>
                  </TouchableOpacity>

                  {/* <TouchableOpacity>
                    <Text style={styles.delete}>Delete Account</Text>
                  </TouchableOpacity>  */}

                </Form>

                <Spinner
                  visible={this.state.loading}
                  color={'#7da8ae'}
                  />

              </View>
            ) :(
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
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  loginType       : state.user.loginType,
  accessToken     : state.user.accessToken,
  email           : state.user.email,
  name            : state.user.name,
  salonName       : state.user.salonName,
  salonId         : state.user.salonId,
  hairdresserName : state.user.hairdresserName
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getUser: Actions.getUser,
    clearUser: Actions.clearUser,
    clearSaloninfo: Actions.clearSaloninfo
  }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings)