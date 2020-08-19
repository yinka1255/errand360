import React, { Component  } from 'react';
import { AppState, View, Text, Alert, Image, Button, TextInput, StyleSheet, ScrollView,BackHandler, ActivityIndicator, ImageBackground, StatusBar, TouchableOpacity, AsyncStorage } from 'react-native';
import {NavigationActions} from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import { SERVER_URL } from './config/server';

export class EatDeliveryAddress extends Component {
  constructor(props) {
    super();
    this.handleBackPress = this.handleBackPress.bind(this);
    this.state = {
      radioButtons: ['Option1', 'Option2', 'Option3'],
      checked: 0,
      toggleUpdate: false,
      visible: false,
      forgotVisible: false,
      name: '',
      phone: '',
      city: '',
      address: '',
      email: '',
      password: '',
      email1: '',
      payWithWallet: true,
      payWithCard: false,
    }
    this.getLoggedInUser();
  }

  async componentDidMount() {
    
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    Alert.alert(
      "Confirm exit",
      "Are you sure you want to exit this app?",
      [
        {
          text: "Stay here",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        //{ text: "Go to home", onPress: () => this.props.navigation.navigate('Home') },
        { text: "Leave", onPress: () => BackHandler.exitApp() }
      ],
      //{ cancelable: false }
    );
    return true
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  toggleUpdate(){
    if(this.state.toggleUpdate == true){
      this.setState({
        toggleUpdate: false
      })
    }else{
      this.setState({
        toggleUpdate: true
      })
    }
  }
  showAlert(type, message){
    Alert.alert(
      type,
      message,
    );
  }

  async getLoggedInUser(){
    await AsyncStorage.getItem('customer').then((value) => {
      if(value){
        this.props.navigation.navigate('Home')
        // this.setState({
        //   customer: JSON.parse(value)
        // }, () => {
        //   this.setState({
        //     customer_id: this.state.customer.id
        //   })
        // });
          
      }else{
        AsyncStorage.getItem('loginvalue').then((value) => {
          if(value){
            this.setState({
              email: value
            })
          }   
        });
      }
    });
  }
  showLoader(){
    this.setState({
      visible: true
    });
  }
  hideLoader(){
    this.setState({
      visible: false
    });
  }
  
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }
  static navigationOptions = {
      header: null
  }

  login(){
      this.showLoader();
      fetch(`${SERVER_URL}/mobile/login`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: this.state.email,
            password: this.state.password,
        })
      }).then((response) => response.json())
          .then((res) => {
            this.hideLoader();
            if(res.success){
              AsyncStorage.setItem('customer', JSON.stringify(res.customer)).then(() => {
                AsyncStorage.setItem('loginvalue', this.state.email).then(() => {
                  this.props.navigation.navigate('Home')
                });
                //this.showAlert("error", res.error)
              });
            }else{
              this.showAlert("Error", res.error)
            }
    }).done();
  }

  forgot(){
      this.showLoader();
      fetch(`${SERVER_URL}/mobile/forgot_password_post`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: this.state.email,
        })
      }).then((response) => response.json())
          .then((res) => {
            this.hideLoader();
            if(res.success){
              this.showAlert("success", res.success)
            }else{
              this.showAlert("Error", res.error)
            }
    }).done();
  }
  

  render() {
    const { visible } = this.state;
    return (
      <View style = {styles.body}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <StatusBar translucent={true}  backgroundColor={'#CE7EFB'}  />
          <TouchableOpacity  onPress={() => this.props.navigation.navigate('Cart')}>
            <Image source = {require('./imgs/back1.png')} style = {styles.backImage} />
          </TouchableOpacity>
          <Text style = {styles.headerText}>Delivery info</Text>
            <View style = {styles.bottomView}>
              <View style= {styles.row}>
                <View style= {styles.col50}>
                  <Text style = {styles.label1}>Contact person</Text>
                  <TextInput
                                    style={styles.input}
                                    placeholder="Name"
                                    onChangeText={(text) => this.setState({name: text})}
                                    underlineColorAndroid="transparent"
                                    placeholderTextColor="#ccc" 
                                    value={this.state.name}
                                    //keyboardType={'email-address'}
                                  />
                </View>
                <View style= {styles.col50}>
                  <Text style = {styles.label}>Contact phone</Text>
                  <TextInput
                                style={styles.input}
                                placeholder="Phone"
                                onChangeText={(text) => this.setState({phone: text})}
                                underlineColorAndroid="transparent"
                                minLength={11}
                                maxLength={11}
                                keyboardType={'phone-pad'}
                              />
                </View>
              </View>
              <Text style = {styles.label}>City</Text>
              <TextInput
                      style={styles.input}
                      placeholder="Enter city"
                      onChangeText={(text) => this.setState({city: text})}
                      underlineColorAndroid="transparent"
                      placeholderTextColor="#ccc" 
                      value={this.state.lastName}
                      //keyboardType={'email-address'}
                    />
              <Text style = {styles.label}>Address</Text>
              <TextInput
                      style={styles.input}
                      placeholder="Enter Address"
                      onChangeText={(text) => this.setState({address: text})}
                      underlineColorAndroid="transparent"
                      placeholderTextColor="#ccc" 
                      value={this.state.address}
                      //keyboardType={'email-address'}
                    />
              <Text style = {styles.headerTextZ}>Payment options</Text>
              <TouchableOpacity style = {styles.cardView}   onPress={() => this.setState({payWithWallet: false, payWithCard: true})} >
                <Image source = {require('./imgs/card2.png')} style = {styles.cardIcon1} />
                <Text style = {styles.cardText}>Pay with card</Text>
                {this.state.payWithCard &&
                <Image source = {require('./imgs/check-circle.png')} style = {styles.checkIcon} />
                }
              </TouchableOpacity>
              <TouchableOpacity style = {styles.cardView}  onPress={() => this.setState({payWithCard: false, payWithWallet: true})}>
                <Image source = {require('./imgs/wallet2.png')} style = {styles.cardIcon} />
                <Text style = {styles.cardText}>Pay from wallet</Text>
                {this.state.payWithWallet &&
                <Image source = {require('./imgs/check-circle.png')} style = {styles.checkIcon} />
                }
              </TouchableOpacity>
              <TouchableOpacity style={styles.addView} >
                  <LinearGradient start={{x: 0, y: 0}} end={{x:1, y: 0}}  colors={['rgba(206,126,251,1)', 'rgba(126,83,191,1)']} style={styles.addGradient}>
                    <Text style={styles.addText}>Next</Text>
                  </LinearGradient>
                </TouchableOpacity>
             
            </View>
          </ScrollView>

        <Modal
          isVisible={this.state.visible}
          onTouchOutside={() => {
            //this.setState({ visible: false });
          }}
          height= {'100%'}
          width= {'100%'}
          style={styles.modal}
        >
          <View style={styles.modalView}>
          <ActivityIndicator size="small" color="#ccc" />
          </View>
        </Modal>

        
        
      </View>
    )
  }
}

export default EatDeliveryAddress

const styles = StyleSheet.create ({
  container: {
    width: '100%',
  },
  body: {
    minHeight: '100%',
    backgroundColor: "#fff",
  },
  backImage: {
    width: 18,
    height: 12,
    marginLeft: 20,
    marginTop: 40,
  },
  headerText: {
    fontSize: 20,
    paddingLeft: 25,
    marginTop: 8,
    color: '#585757',
  },
  headerTextZ: {
    fontSize: 20,
    paddingLeft: 25,
    marginTop: 20,
    color: '#585757',
  },
  logoImage: {
    marginTop: 60,
    alignSelf: 'center',
    width: 75,
    height: 78,
  },
  bottomView: {
    width: '100%',
    alignSelf: 'center',
    marginTop: 10,
  },
  cardView: {
    width: 190,
    alignSelf: 'flex-start',
    padding:10,
    //backgroundColor: '#444',
    borderRadius: 2,
    marginTop: 5,
    marginLeft: 15,
    flexDirection: 'row'
  },
  cardIcon: {
    width: 25,
    height: 17,
    marginTop: 7,
  },
  cardIcon1: {
    width: 25,
    height: 16,
    marginTop: 7,
  },
  cardText: {
    color: '#fff',
    paddingLeft: 5,
    //paddingTop: 5,
  },
  checkIcon: {
    width: 22,
    height: 22,
    alignSelf: 'center',
    // paddingBottom: 5,
    // paddingLeft: 15
    position: 'absolute',
    top: 13,
    right: 17
  },
  cardText: {
    color: '#3D3838',
    paddingLeft: 15,
    paddingTop: 5,
  },
  addText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
  },
  addView: {
    width: '80%',
    height: 40,
    alignSelf: 'center',
    marginTop: 20,
  },
  addGradient: {
    borderRadius: 10,
    width: '100%',
    height: 40,
    paddingTop: 7,
  },
  row: {
    flexDirection: 'row',
    width: '95%',
    alignContent: 'center',
    alignSelf: 'center',
  },



  label1:{
    color: '#555',
    paddingLeft: 10,
    marginTop: 10,
  },
  label:{
    color: '#555',
    paddingLeft: 15,
    marginTop: 10,
  },
  input: {
    width: '90%',
    height: 46,
    backgroundColor: '#EFF0F3',
    borderRadius: 6,
    alignSelf: 'center',
    marginTop: 5,
    paddingLeft: 10,
    color: '#ccc',
  },
  input1: {
    width: '9%',
    height: 40,
    backgroundColor: '#aaa',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 10,
    paddingLeft: 25,
    color: '#222'
  },
  forgotText: {
    textAlign: 'center',
    //marginRight: 30,
    color: '#5B5B5B',
    fontSize: 12,
    marginTop: 10,
  },
  forgotText1: {
    textAlign: 'center',
    //marginRight: 30,
    color: '#8356C3',
    fontSize: 12,
  },
  createText1: {
    textAlign: 'center',
    marginTop: 13,
  },
  
  createText: {
    textAlign: 'center',
    color: '#8356C3',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 10,
  },
  col50: {
    width: '50%',
  },
  
submitButton: {
  marginTop: 20,
  backgroundColor: '#8356C3',
  borderRadius: 10,
  width: '80%',
  alignSelf: 'center',
  paddingTop: 12,
  paddingBottom: 13,
},
submitButton1: {
  marginTop: 20,
  backgroundColor: '#e2aa2e',
  opacity: 0.7,
  borderRadius: 2,
  width: '90%',
  alignSelf: 'center',
  paddingTop: 12,
  paddingBottom: 13,
},
submitButtonText: {
  color: '#fff',
  textAlign: 'center'
},
loaderImage: {
  width: 80,
  height: 80,
  alignSelf: 'center',
  zIndex: 99999999999999,
  
},
modal: {
  margin: 0,
  padding: 0
},
modalView: {
  // width: '100%',
  // height: '100%',
  // opacity: 0.9,
  alignSelf: 'center',
  height: 50,
  width: 100,
  backgroundColor: '#FFF',
  paddingTop: 18,
},


forgotModalView: {
  // width: '100%',
  // height: '100%',
  // opacity: 0.9,
  alignSelf: 'center',
  height: 280,
  width: '90%',
  backgroundColor: '#FFF',
  paddingTop: 18,
},
  
})