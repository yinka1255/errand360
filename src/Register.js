import React, { Component  } from 'react';
import { AppState, View, Text, Alert, Image, Button, TextInput, StyleSheet, ScrollView,BackHandler, ActivityIndicator, ImageBackground, StatusBar, TouchableOpacity, AsyncStorage } from 'react-native';
import {NavigationActions} from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import { SERVER_URL } from './config/server';

export class Register extends Component {
  constructor(props) {
    super();
    this.handleBackPress = this.handleBackPress.bind(this);
    this.state = {
      radioButtons: ['Option1', 'Option2', 'Option3'],
      checked: 0,
      toggleUpdate: false,
      visible: false,
      forgotVisible: false,
      email: '',
      password: '',
      email1: '',
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
          <StatusBar translucent={true}  backgroundColor={'#8356C3'}  />
          <Image source = {require('./imgs/back1.png')} style = {styles.backImage} />
          <Text style = {styles.headerText}>Let's create your account</Text>
            <View style = {styles.bottomView}>
              <View style= {styles.row}>
                <View style= {styles.col50}>
                  <Text style = {styles.label1}>First name</Text>
                  <TextInput
                                    style={styles.input}
                                    placeholder=""
                                    onChangeText={(text) => this.setState({firstName: text})}
                                    underlineColorAndroid="transparent"
                                    placeholderTextColor="#ccc" 
                                    value={this.state.firstName}
                                    //keyboardType={'email-address'}
                                  />
                </View>
                <View style= {styles.col50}>
                  <Text style = {styles.label1}>Last name</Text>
                  <TextInput
                                    style={styles.input}
                                    placeholder=""
                                    onChangeText={(text) => this.setState({lastName: text})}
                                    underlineColorAndroid="transparent"
                                    placeholderTextColor="#ccc" 
                                    value={this.state.lastName}
                                    //keyboardType={'email-address'}
                                  />
                </View>
              </View>
              <Text style = {styles.label}>Email</Text>
              <TextInput
                                style={styles.input}
                                placeholder="Email"
                                onChangeText={(text) => this.setState({email: text})}
                                underlineColorAndroid="transparent"
                                placeholderTextColor="#ccc" 
                                value={this.state.email}
                                //keyboardType={'email-address'}
                                autoCapitalize = "none"
                              />
              <Text style = {styles.label}>Phone</Text>
              <TextInput
                            style={styles.input}
                            placeholder="Phone"
                            onChangeText={(text) => this.setState({phone: text})}
                            underlineColorAndroid="transparent"
                            minLength={11}
                            maxLength={11}
                            keyboardType={'phone-pad'}
                          />
              <Text style = {styles.label}>Password</Text>
              <TextInput
                                style={styles.input}
                                placeholder="Password"
                                onChangeText={(text) => this.setState({password:text})}
                                underlineColorAndroid="transparent"
                                placeholderTextColor="#ccc" 
                                autoCapitalize = "none"
                                secureTextEntry={true} 
                              />
              <Text style = {styles.label}>City</Text>
              <TextInput
                      style={styles.input}
                      placeholder=""
                      onChangeText={(text) => this.setState({city: text})}
                      underlineColorAndroid="transparent"
                      placeholderTextColor="#ccc" 
                      value={this.state.lastName}
                      //keyboardType={'email-address'}
                    />
              <TouchableOpacity style = {styles.forgotView}  >
                <Text style = {styles.forgotText}>I agree to Erand360's <Text style = {styles.forgotText1}>Terms of Service</Text></Text>
              </TouchableOpacity>
              <TouchableOpacity  onPress={() => this.props.navigation.navigate('Home')} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Continue</Text>
                
              </TouchableOpacity>
              <TouchableOpacity style = {styles.forgotView} onPress={() => this.props.navigation.navigate('Login')}>
              <Text style = {styles.createText1}>Have an account? <Text style = {styles.createText}>Login</Text></Text>
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

export default Register

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
    marginTop: 30,
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