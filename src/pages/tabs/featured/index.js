/**
 * Description: Featured page
 * Date: 3/25/2019
 */

import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Image, TouchableOpacity, FlatList } from 'react-native';
import { Container, Content } from 'native-base';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import { NavigationEvents } from "react-navigation";
import SplashScreen from 'react-native-splash-screen';

import * as Actions from './../../../redux/actions';
import styles from "./styles";

class Featured extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading : true,
      data    : []
    }
    
    this.props.getUser();
    setTimeout(() => {
      SplashScreen.hide();        
    }, 1000);
  }
  
  init = () => {    
    this.setState({
      loading: true
    })
    axios.get("https://geselle.se/wp-json/wp/v2/campaigns").then((response) => {
      this.setState({
        loading : false,
        data    : response.data
      })
    }).catch((error) => {
      this.setState({
        loading: false
      })
      console.warn('featured err: ', error)
    })
  }

  onPress = (uri) => {
    this.props.navigation.navigate('Shop', {
      uri: uri
    })
  }

  render() {
    const { loading, data } = this.state;
    console.warn("data: ", this.state.data)
    return (
      <Container>
        <NavigationEvents
          onWillFocus={() => {
            this.init();
          }}
        />
        <Content>
          {
            data.length > 0 &&
              <FlatList
                data = {data}
                renderItem={({item})=>{
                  return (                    
                    <TouchableOpacity onPress={() => this.onPress(item.acf.shop_image_url)}>
                      <Image
                        source={{uri: item.better_featured_image.media_details.sizes.medium.source_url}}
                        style={styles.bg}
                      />
                    </TouchableOpacity>
                  )
                }}
                keyExtractor={(item, index) => index.toString()}
              />
          }
        </Content>

        <Spinner
          visible={loading}
          color={'#7da8ae'}
          />

      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getUser: Actions.getUser
  }, dispatch);
};

export default connect(
    null,
    mapDispatchToProps
)(Featured)