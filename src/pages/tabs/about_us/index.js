/**
 * Description: Login page
 * Date: 1/16/2019
 */

import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, ImageBackground, FlatList, Linking, TouchableOpacity, Image } from 'react-native';
import { Container, Header, Content, Body, Title, Button, Icon } from 'native-base';
import { Rating } from 'react-native-ratings';
import Spinner from 'react-native-loading-spinner-overlay';
import { NavigationEvents } from "react-navigation";
import Toast from 'react-native-root-toast';

import * as Actions from './../../../redux/actions';
import * as Utils from './../../../utils';
import globalStyles from "./../../../globalStyles";
import styles from "./styles";
import about_us from './../../../assets/images/about_us.png';
import login_img from './../../../assets/images/temp.png';
import CustomIcon from './../../../assets/CustomIcon';

const days = {
  Monday: "Mån",
  Tuesday: "Tis",
  Wednesday: "Ons",
  Thursday: "Tor",
  Friday: "Fre",
  Saturday: "Lör",
  Sunday: "Sön"
}

class AboutUs extends Component {
  constructor(props) {
    super(props);
    this.props.getUser();
  }

  openSite = async(url) => {
    let http = "http://" + url;    
    let isHttp = await Linking.canOpenURL(http);
    
    if(isHttp) {
      Linking.openURL(http);
    } else {
      Toast.show("Can't open this uri - " + url, {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
      });
    }
  }  

  render() {
    const { loading, info, error, accessToken } = this.props;
    console.warn('accessToken: ', accessToken)
    let flag;
    if(accessToken) {
      flag = true;
    } else {
      flag = false;
    }

    return (
      <Container>
        <NavigationEvents
          onWillFocus={() => {
            if(accessToken)
              this.props.getSaloninfo();
            else
              this.props.getUser();
          }}
        />
        {
          flag && info && 
            <Header style={styles.header}>
              <Body style={styles.header_body}>
                <Title style={styles.white}>{info.name.toUpperCase()}</Title>
              </Body>
            </Header>
        }
        {
          flag && info && 
            <Content>
              <ImageBackground
                source={info.Galleries.length > 0 && info.Galleries[0].imagePath? {uri: Utils.root + info.Galleries[0].imagePath} : about_us}
                style={styles.bg}
              />
              <View style={styles.about_container}>
                <Text style={styles.about_title}>Om oss</Text>
                <Text>{info.description}</Text>
              </View> 
              <View style={styles.info_container}>
                <View style={styles.info_hours}>
                  <Icon name="clock" type="EvilIcons" style={styles.icon_hours} />
                  {
                    info.OpeningHours.length > 0 &&
                      <FlatList
                        data = {info.OpeningHours}
                        renderItem={({item})=>{
                          return (
                            <View style={styles.hour}>
                              <View style={{flex: 0.8}}>
                                <Text>{days[item.name]} </Text>
                              </View>
                              {
                                item.open &&
                                  <View>
                                    <Text>{item.openAt.substr(0,2)}:{item.openAt.substr(2,2)} </Text>
                                  </View>
                              }
                              {
                                item.open &&
                                  <View>
                                    <Text>- {item.closeAt.substr(0,2)}:{item.closeAt.substr(2,2)}</Text>
                                  </View>
                              }
                              {
                                !item.open &&
                                  <View style={{flex: 1.4}}>
                                    <Text>Stängt</Text>
                                  </View>
                              }
                            </View>
                          )
                        }}
                        keyExtractor={(item, index) => index.toString()}
                      />
                  }
                </View>
                <View style={styles.info_address}>
                  <Icon name="location-pin" type="Entypo" style={styles.icon_hours} />
                  <Text>{info.address + ","}</Text>
                  <Text>{info.city}, {info.post}</Text>
                  {
                    info.telephone != "" &&
                      <TouchableOpacity style={styles.item_container} onPress={()=>Linking.openURL(`tel:${info.telephone}`)}>
                        <Icon name="telephone" type="Foundation" style={styles.item_icon} />
                        <Text style={styles.item}>{info.telephone}</Text>
                      </TouchableOpacity>
                  }
                  {
                    info.website != "" &&
                      <TouchableOpacity style={styles.item_container} onPress={() => this.openSite(info.website)}>
                        <Icon name="web" type="Foundation" style={styles.item_icon} />
                        <Text style={styles.item}>{info.website}</Text>
                      </TouchableOpacity>
                  }
                  <View style={styles.item_container}>
                    {
                      info.parking &&
                        <View style={{flexDirection: 'row'}}>
                          <Icon name="parking" type="FontAwesome5" style={styles.item_icon} />                   
                        </View>
                    }
                    {
                      info.accessibility &&                        
                        <View style={{flexDirection: 'row', paddingLeft: 15}}>
                          <Icon name="accessible-icon" type="FontAwesome5" style={styles.item_icon} />                   
                        </View>
                    }
                  </View>
                </View>
              </View>

              {/* <View style={styles.rating_container}>
                <Rating showRating={false} readonly fractions={1} startingValue={3.3} imageSize={24} ratingColor="#D1B65C" style={styles.rating} />   
                <Text>(36 review from google)</Text> 
              </View> */}
            </Content>
        }  
        {
          flag && !loading && !info &&
            <Content>
              <View style={globalStyles.bg_container}>
                <View style={styles.w_80_p}>
                  <Button block style={[globalStyles.block_button, {backgroundColor: '#88A177'}]} onPress={() => this.props.navigation.navigate('SelectSalon')}>
                    <CustomIcon name='salon' style={styles.salon_icon} />
                    <Text style={globalStyles.button_text} uppercase={false}> Välj din salong</Text>
                  </Button>
                </View>
              </View>
            </Content>
        }
        {
          !flag &&
            <Content>
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
            </Content>
        }
        <Spinner
          visible={loading}
          color={'#7da8ae'}
          />

      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  accessToken : state.user.accessToken,
  loading : state.salon_info.loading,
  info    : state.salon_info.info,
  error   : state.salon_info.error
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getSaloninfo: Actions.getSaloninfo,
    getUser: Actions.getUser
  }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AboutUs)