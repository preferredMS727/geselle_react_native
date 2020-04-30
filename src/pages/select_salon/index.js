/**
 * Description: Login page
 * Date: 1/16/2019
 */

import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, TouchableOpacity, Image, FlatList } from 'react-native';
import { Container, Content, Item, Input, Text, Icon } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';

import * as Actions from './../../redux/actions';
import globalStyles from "./../../globalStyles";
import styles from "./styles";
import about_us from './../../assets/images/about_us.png';
import * as Utils from './../../utils';

class SelectSalon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading : false,
      search  : "",
      salons  : []
    }
  }

  search = () => {
    if(this.state.search !== "") {
      this.setState({
        loading: true
      })
      Utils.xapi().post('consumer/searchsalon', {
        searchSalonName: this.state.search
      }).then((res) => {
        console.warn("salons: ", res.data)
        this.setState({
          loading : false,
          salons  : res.data.salons
        })
      }).catch((err) => {
        this.setState({
          loading : false
        });
        
        Utils.toast(JSON.parse(err.request.response).error);
      })
    }
  }

  selectSalon = (salon) => {
    console.warn("click salon: ", salon)
    this.props.navigation.navigate("SelectHairdresser", {salon: salon})
    // this.setState({
    //   loading: true
    // })
    // Utils.xapi().post('consumer/setDefaultSalon', {
    //   salonId: salon.salonId
    // }).then(() => {
    //   this.props.updateUser({
    //     salonId: salon.salonId.toString(),
    //     salonName: salon.name
    //   });
    //   Utils.toast("Your default salon is changed.");
    //   this.props.navigation.goBack();
    //   this.setState({
    //     loading : false
    //   })
    // }).catch((err) => {
    //   console.warn('select salon err: ', err)
    //   this.setState({
    //     loading : false
    //   });
      
    //   Utils.toast(JSON.parse(err.request.response).error);
    // })
  }

  render() {
    const { loading, search, salons } = this.state;
    return (
      <Container>
        <Content>
          <View style={globalStyles.container}>
            <View style={styles.header}>
              <View style={styles.title}>
                <TouchableOpacity style={styles.back} onPress={()=>this.props.navigation.goBack()}>
                  <Icon name="arrow-back" type="MaterialIcons" style={styles.back_icon} />
                </TouchableOpacity>
                <Text style={styles.font_18}>Hitta din salong</Text>                
              </View>
              <Item regular style={styles.search}>
                <Input placeholder='Sök...' onChangeText={(search) => this.setState({search})} onEndEditing={this.search} />
                {
                  search !== "" &&
                    <Icon active name='search1' type="AntDesign" style={styles.search_button} onPress={this.search} />
                }
              </Item>
            </View>
            <View style={styles.divider}></View>
            <View style={styles.mx_16}>
              {
                salons.length > 0? (
                  <FlatList
                    data = {salons}
                    keyboardShouldPersistTaps={'handled'}
                    renderItem={({item})=>{
                      return (
                        <View style={styles.salon_item}>
                          <Image source={item.salonImage? {uri: Utils.root + item.salonImage} : about_us} style={styles.salon_image} />
                          <View style={styles.salon_info}> 
                            <View style={styles.salon_name}>
                              <Text style={[styles.font_18, {textAlign: 'left'}]}>{item.name}</Text>
                            </View>
                            <View style={styles.salon_address}>
                              <View style={styles.address_container}>
                                <Icon name="location-pin" type="Entypo" style={styles.address_icon} />
                                <Text style={styles.font_12}>{item.address},</Text>
                                <Text style={styles.font_12}>{item.city}, {item.post}</Text>
                              </View>
                              <TouchableOpacity style={styles.save_button} onPress={() => this.selectSalon(item)}>
                                <Text style={styles.button_text}>Välj</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                  />
                ) : (
                  <Text style={{textAlign: 'center', marginTop: 30}}>Ingen salong hittad</Text>
                )
              }
            </View>
          </View>

          <Spinner
            visible={loading}
            color={'#7da8ae'}
            />

        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateUser: Actions.updateUser
  }, dispatch);
};

export default connect(
    null,
    mapDispatchToProps
)(SelectSalon)