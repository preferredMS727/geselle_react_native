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
import avatar from './../../assets/images/avatar1.jpg';
import * as Utils from './../../utils';

class SelectHairdresser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading : false,
      originEmployees: [],
      employees: [],
      search  : ""
    };
  }

  componentDidMount() {
    this.setState({
      loading: true
    })
    const salon = this.props.navigation.getParam('salon', '')
    Utils.xapi().post('consumer/salonemployees', {
      salonId: salon.salonId
    }).then((response) => {
      console.warn('employess: ', response.data.employees)
      this.setState({
        loading: false,
        originEmployees: response.data.employees,
        employees: response.data.employees
      })
    })
  }

  search = (value) => {
    let temp = this.state.originEmployees.filter( employee => {
      return employee.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
    });

    this.setState({
      employees: temp
    })
  }

  save = (hairdresser) => {
    console.warn({
      salonId : this.props.navigation.getParam('salon', '').salonId.toString(),
      salonName: this.props.navigation.getParam('salon', '').name,
      hairdresserId: hairdresser.hairdresserId.toString(),
      hairdresserName: hairdresser.name,
    })
    this.setState({
      loading: true
    })
    Utils.xapi().post('consumer/setdefaultsalon', {
      salonId: this.props.navigation.getParam('salon', '').salonId,
      hairdresserId: hairdresser.hairdresserId
    }).then((response) => {
      console.warn("res: ", response.data)
      this.props.updateUser({
        salonId : this.props.navigation.getParam('salon', '').salonId.toString(),
        salonName: this.props.navigation.getParam('salon', '').name,
        hairdresserId: hairdresser.hairdresserId.toString(),
        hairdresserName: hairdresser.name,
      });
      Utils.toast("Du har nu valt din frisör.");
      // this.props.navigation.goBack();
      this.setState({
        loading : false
      })
    }).catch((err) => {
      console.warn("err: ", err)
      this.setState({
        loading : false
      });
      
      Utils.toast(JSON.parse(err.request.response).error);
    })
  }

  render() {
    const { loading, employees } = this.state;
    return (
      <Container>
        <Content>
          <View style={globalStyles.container}>
            <View style={styles.header}>
              <View style={styles.title}>
                <TouchableOpacity style={styles.back} onPress={()=>this.props.navigation.goBack()}>
                  <Icon name="arrow-back" type="MaterialIcons" style={styles.back_icon} />
                </TouchableOpacity>
                <Text style={styles.font_18}>Select Hairdresser</Text>                
              </View>
              <Item regular style={styles.search}>
                <Input placeholder='Sök...' onChangeText={(search) => this.search(search)} />
              </Item>
            </View>
            <View style={styles.divider}></View>
            <View style={styles.mx_16}>
              {
                employees.length > 0? (
                  <FlatList
                    data = {employees}
                    keyboardShouldPersistTaps={'handled'}
                    renderItem={({item})=>{
                      return (
                        <View style={styles.list}>
                          <Image source={item.avatar? {uri: Utils.root + item.avatar} : avatar} style={styles.avatar} />
                          <Text style={styles.name}>{item.name}</Text>
                          <TouchableOpacity style={styles.save_button} onPress={() => this.save(item)}>
                            <Text style={styles.button_text}>Välj</Text>
                          </TouchableOpacity>
                        </View>
                      )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                  />
                ) : (
                  <Text style={{textAlign: 'center', marginTop: 30}}>No Hairdresser</Text>
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
)(SelectHairdresser)